import type { APIRoute } from 'astro';
import { GROQ_API_KEY } from 'astro:env/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { rounds, players } = await request.json();

    const stream = await client.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: `
        Role: You are an expert Sports Lineup Coordinator. Your goal is to generate 3 distinct and optimized lineup options based on player data and rounds provided by the user.

        Constraints & Logic:

        Availability: Exclude any players marked as "absent" or "unavailable."

        Specific Slots: If a player is only available for a specific round/batch, they must be prioritized for that slot. but if there is a better player for that slot, you must choose the better player.

        Pairing Rules:

        Each pair must consist of two players from different positions: one Left and one Right.

        Players marked as "Both" or "Any" can fill either position to optimize the team.

        Pair Ranking: Pairs are ranked by their combined totalPoints. (Rank 1 = Highest combined points).

        Match Sequence: You must follow this specific order for the matches based on Pair Rank:

        Match 1: Pair 5 (Lowest points)

        Match 2: Pair 4

        Match 3: Pair 1 (Highest points)

        Match 4: Pair 2

        Match 5: Pair 3

        Performance Factor: If player "performance" data is provided, use it as a tie-breaker or to refine the "best option" selections.

        Output Requirements:

        Generate 3 varied lineup options to give the user diversity.

        The output must be formatted strictly in Markdown (using tables or clear lists).

        Ensure the "Best Options" are always prioritized in Option 1.

        if we don't have enough players to fill the lineup, you must return the best possible lineup you can with the players you have.

        display the lineup in a table format.

        the table must have the following columns:

        - Position
        - Name (Name and Surname concatenated)
        - Points

        and the total points of the pair.

        the Players info is stringified, so you must parse it to get the players info.

        the Players info is an array of objects with the following properties:

        - position: number
        - name: string
        - surname: string
        - totalPoints: number
        - side: 'left' | 'right' | 'both'
        - status: 'present' | 'absent' |'tanda-\${number}'

        'tanda-\${number}' means the player is available for that round.
        eg: if the rounds are 2-3, the player is available for the pair 5 or pair 4.
        `,
        },
        {
          role: 'user',
          content: `
         Rounds: ${rounds}
         Players: ${JSON.stringify(players)}
        `,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? '';
            if (content)
              controller.enqueue(encoder.encode(content));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch {
    const message = 'Internal server error';
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
