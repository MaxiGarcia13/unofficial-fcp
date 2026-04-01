import type { APIRoute } from 'astro';
import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { GROQ_API_KEY } from 'astro:env/server';
import { getIAUserPrompt, IA_SYSTEM_PROMPT } from '@/constants/ia';

const groq = createGroq({
  apiKey: GROQ_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();

    const rounds = typeof payload?.rounds === 'string' ? payload.rounds.trim() : '';
    const players = Array.isArray(payload?.players) ? payload.players : [];

    if (!rounds || players.length === 0) {
      return new Response(JSON.stringify({ message: 'Invalid request payload' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: IA_SYSTEM_PROMPT,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: getIAUserPrompt(rounds, players.sort((a, b) => b.totalPoints - a.totalPoints)),
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating lineup stream:', error);

    const message = 'Internal server error while generating lineup stream';
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
