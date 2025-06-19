require('dotenv').config();
const { google } = require('googleapis');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body || '{}');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    return { statusCode: 400, body: 'Invalid email address' };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:A',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) };
  } catch (error) {
    console.error('Google Sheets error:', error);
    return { statusCode: 500, body: 'Failed to save email' };
  }
};
