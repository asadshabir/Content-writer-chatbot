import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface GenerateContentRequest {
  prompt: string;
  mode: 'draft' | 'seo' | 'polish' | 'summarize' | 'chat';
  context?: string;
}

async function generateWithGemini(prompt: string, apiKey: string) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', response.status, errorText);
      
      // Handle specific error cases
      if (response.status === 400) {
        throw new Error('Invalid request to AI service. Please try a different prompt.');
      } else if (response.status === 429) {
        throw new Error('Rate limit reached. Please wait a moment and try again.');
      } else if (response.status === 403) {
        throw new Error('API key is invalid or expired. Please check your configuration.');
      } else {
        throw new Error(`AI service error (${response.status}). Please try again.`);
      }
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error('No content generated. Please try again.');
    }
    
    return generatedText;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to connect to AI service. Please check your internet connection.');
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode, context } = await req.json() as GenerateContentRequest;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured',
          message: 'Please add your Google Gemini API key to .env.local as OPENAI_API_KEY'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // For draft mode, show multi-step process
          if (mode === 'draft') {
            // Step 1: Initial message
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              step: 'init',
              content: '📊✍️ Crafting your SEO-optimized blog with powerful insights… ⏳ please wait! 🚀\n\n'
            })}\n\n`));
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Step 2: Generate draft
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              step: 'draft',
              content: '📝 **Draft Generated** ✅\n\n'
            })}\n\n`));
            
            const draftPrompt = `You are a multilingual content drafting agent that supports English, Roman Sindhi, and Roman Urdu. Based on the topic "${prompt}", create a comprehensive first draft blog post with a clear structure: introduction, main body sections, and conclusion. Use proper Markdown formatting with # for H1, ## for H2, ### for H3. Make it informative and well-organized. Include engaging hooks and smooth transitions. If the user writes in Roman Sindhi or Roman Urdu, respond in the same language naturally and fluently.`;
            
            const draftContent = await generateWithGemini(draftPrompt, apiKey);
            await new Promise(resolve => setTimeout(resolve, 800));

            // Step 3: Polish
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              step: 'polish',
              content: '✨ **Polished Content** ✅\n\n'
            })}\n\n`));
            
            const polishPrompt = `Polish this blog for grammar, clarity, flow, and engagement. Maintain the same language (English, Roman Sindhi, or Roman Urdu) as the original content:\n\n${draftContent}`;
            const polishedContent = await generateWithGemini(polishPrompt, apiKey);
            await new Promise(resolve => setTimeout(resolve, 800));

            // Step 4: SEO Optimize
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
              step: 'seo',
              content: '🔍 **SEO Optimized** ✅\n\n---\n\n'
            })}\n\n`));
            
            const seoPrompt = `Optimize this blog for SEO by inserting relevant keywords naturally. Use proper Markdown formatting. Keep the same language (English, Roman Sindhi, or Roman Urdu) as the original:\n\n${polishedContent}`;
            const finalContent = await generateWithGemini(seoPrompt, apiKey);

            // Stream final content word by word
            const words = finalContent.split(' ');
            for (let i = 0; i < words.length; i++) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                step: 'final',
                content: words[i] + ' '
              })}\n\n`));
              await new Promise(resolve => setTimeout(resolve, 25));
            }

          } else {
            // For other modes, use single-step generation with multilingual support
            const systemPrompts = {
              seo: `You are a multilingual SEO Blog Optimizer Agent that supports English, Roman Sindhi, and Roman Urdu. Take the provided content and optimize it for SEO. Insert relevant keywords naturally. Use proper Markdown formatting. Respond in the same language as the input.`,
              polish: `You are a multilingual rewriting agent that supports English, Roman Sindhi, and Roman Urdu. Polish this content for grammar, clarity, flow, and engagement. Make it professional yet conversational. Maintain the same language as the input.`,
              summarize: `You are a multilingual summarization agent that supports English, Roman Sindhi, and Roman Urdu. Summarize the provided text comprehensively using bullet points, **bold text**, and *italics* for emphasis. Keep the same language as the input.`,
              chat: `You are a helpful multilingual AI assistant that fluently supports English, Roman Sindhi, and Roman Urdu for an SEO content writing platform. Be warm and friendly. Use relevant emojis. Detect the language of the user's message and respond naturally in the same language.`
            };

            const systemPrompt = systemPrompts[mode] || systemPrompts.chat;
            const fullPrompt = context 
              ? `${systemPrompt}\n\nContext:\n${context}\n\nUser Request:\n${prompt}` 
              : `${systemPrompt}\n\nUser Request:\n${prompt}`;

            const generatedText = await generateWithGemini(fullPrompt, apiKey);

            // Stream response word by word
            const words = generatedText.split(' ');
            for (let i = 0; i < words.length; i++) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
                content: words[i] + ' '
              })}\n\n`));
              await new Promise(resolve => setTimeout(resolve, 25));
            }
          }

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            error: true,
            content: `❌ ${errorMessage}`
          })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Generate content error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}