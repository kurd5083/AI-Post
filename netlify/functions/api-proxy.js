export async function handler(event, context) {
  try {
    let path = event.path.replace(/^\/.netlify\/functions\/api-proxy/, '');

    const isApiCall = path.startsWith('/api');
    if (isApiCall) path = path.replace(/^\/api/, '');

    const apiUrl = isApiCall
      ? `http://77.37.65.40:3000/api/v1${path}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters) : ''}`
      : `http://77.37.65.40:3000${path}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters) : ''}`;

    const response = await fetch(apiUrl, {
      method: event.httpMethod,
      headers: { ...event.headers, host: undefined },
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
    });

    const contentType = response.headers.get('content-type') || '';

    if (contentType.startsWith('image/') || contentType.includes('octet-stream')) {
      const data = await response.arrayBuffer();
      return {
        statusCode: response.status,
        headers: { 'Content-Type': contentType },
        body: Buffer.from(data).toString('base64'),
        isBase64Encoded: true,
      };
    }

    const data = await response.text();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': contentType },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// export async function handler(event, context) {
//   try {
//     let path = event.path.replace(/^\/.netlify\/functions\/api-proxy/, '');
//     if (path.startsWith('/api')) path = path.replace(/^\/api/, '');

//     const apiUrl = `http://77.37.65.40:3000/api/v1${path}${event.queryStringParameters ? '?' + new URLSearchParams(event.queryStringParameters) : ''}`;

//     const response = await fetch(apiUrl, {
//       method: event.httpMethod,
//       headers: { ...event.headers, host: undefined },
//       body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
//     });

//     const data = await response.text();

//     return {
//       statusCode: response.status,
//       headers: { 'Content-Type': response.headers.get('content-type') || 'application/json' },
//       body: data,
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// }