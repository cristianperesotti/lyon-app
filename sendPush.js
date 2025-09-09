// netlify/functions/sendPush.js
// Node 18+ en Netlify tiene fetch global; no requiere dependencias.
exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const body = JSON.parse(event.body);
    const tokens = body.tokens || [];
    const notification = body.notification || { title: 'Notificación', body: '' };

    if(!tokens.length) return { statusCode: 400, body: 'No tokens' };

    const FCM_KEY = process.env.FCM_SERVER_KEY;
    if(!FCM_KEY) return { statusCode: 500, body: 'FCM key not configured' };

    const payload = {
      registration_ids: tokens,
      notification,
      priority: 'high'
    };

    const res = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Authorization': 'key=' + FCM_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    return { statusCode: res.status, body: text };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};