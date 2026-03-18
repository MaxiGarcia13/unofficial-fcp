import type { APIRoute } from 'astro'
import type { GroupInfo } from '../../types'

function getGroupInfo(_group: string, _gender: string): GroupInfo {
  return {
    calendarMatches: {
      thisWeek: [],
      upcoming: {},
    },
    ranking: [],
  }
}

export const GET = (({ request }) => {
  const { searchParams } = new URL(request.url)
  const group = searchParams.get('group')
  const gender = searchParams.get('gender')

  const body = getGroupInfo(group, gender)

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  })
}) satisfies APIRoute
