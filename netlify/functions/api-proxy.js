import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    // Получаем путь после /api
    let path = event.path.replace(/^\/.netlify\/functions\/api-proxy/, '');
    
    // Если путь начинается с /api, убираем его
    if (path.startsWith('/api')) {
      path = path.replace(/^\/api/, '');
    }

    // Собираем полный URL к API
    const apiUrl = `http://77.37.65.40:3000/api/v1${path}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters) : ''}`;

    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: { ...event.headers, host: undefined },
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: { 'Content-Type': response.headers.get('content-type') || 'application/json' },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
