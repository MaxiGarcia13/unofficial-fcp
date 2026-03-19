import { API_KEY, API_URL } from 'astro:env/server';

export async function GET({ request }) {
  const { searchParams } = new URL(request.url);

  const group = searchParams.get('group');
  const gender = searchParams.get('gender');

  if (!group || !gender) {
    return new Response(JSON.stringify({ message: 'Group and gender are required' }), { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}/group?${searchParams.toString()}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw response;
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...response.headers,
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error({ error });
    const status = error.status ?? 500;
    const message = error.message ?? 'Internal server error';

    return new Response(JSON.stringify({ message }), { status });
  }
}
