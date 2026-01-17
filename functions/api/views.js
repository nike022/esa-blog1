export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const postId = url.searchParams.get('postId')

  if (!postId) {
    return new Response(JSON.stringify({ error: 'postId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const key = `views:${postId}`

  if (request.method === 'GET') {
    // 获取阅读量
    const views = await env.KV.get(key) || '0'
    return new Response(JSON.stringify({ postId, views: parseInt(views) }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  if (request.method === 'POST') {
    // 增加阅读量
    const currentViews = await env.KV.get(key) || '0'
    const newViews = parseInt(currentViews) + 1
    await env.KV.put(key, newViews.toString())

    return new Response(JSON.stringify({ postId, views: newViews }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  return new Response('Method not allowed', { status: 405 })
}
