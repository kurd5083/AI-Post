export async function handler(event) {
  try {
    let path = event.path.replace(/^\/.netlify\/functions\/api-proxy/, '');
    if (path.startsWith('/api')) path = path.replace(/^\/api/, '');

    const apiUrl =
      `http://77.37.65.40:3000/api/v1${path}` +
      (event.queryStringParameters
        ? `?${new URLSearchParams(event.queryStringParameters)}`
        : '');

    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: {
        Authorization: event.headers.authorization || '',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: ['GET', 'HEAD'].includes(event.httpMethod)
        ? undefined
        : event.body,
    });

    const contentType = response.headers.get('content-type') || '';

    const body = contentType.includes('application/json')
      ? JSON.stringify(await response.json())
      : await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': contentType,
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
