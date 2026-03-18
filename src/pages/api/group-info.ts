import { API_URL } from 'astro:env/server'

export async function GET({ request }) {
  const { searchParams } = new URL(request.url)

  const group = searchParams.get('group')
  const gender = searchParams.get('gender')

  if (!group || !gender) {
    return new Response(JSON.stringify({ message: 'Group and gender are required' }), { status: 400 })
  }

  try {
    const response = await fetch(`${API_URL}/group-info?${searchParams.toString()}`)

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: response.headers,
    })
  }
  catch (error) {
    const { status, message } = error instanceof Error
      ? { status: ('status' in error ? error.status : 500) as number, message: error.message }
      : { status: 500, message: 'Internal server error' }
    return new Response(JSON.stringify({ message }), { status })
  }
}
