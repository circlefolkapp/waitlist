require('dotenv').config();
const { google } = require('googleapis');

exports.handler = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A', // Email column
    });

    const rows = res.data.values || [];
    const count = rows.length; // subtract header row if you have one

    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
    };
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch waitlist count' }),
    };
  }
};
