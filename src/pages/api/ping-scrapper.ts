import { API_KEY, API_URL } from 'astro:env/server';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      return new Response('Failed to ping scrapper', { status: 500 });
    }

    return new Response('Scrapper is running', { status: 200 });
  } catch (error) {
    console.error('Failed to ping scrapper', error);
    return new Response('Failed to ping scrapper', { status: 500 });
  }
}
