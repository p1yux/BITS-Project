import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { registrationEmail } from '@/utils/emailTemplates';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received registration data:', body); // Debug log

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize Google Sheets
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Google Sheets initialized'); // Debug log

    // Format data for sheets
    const values = [
      [
        body.fullName,
        body.email,
        body.gender,
        body.country,
        body.state || 'N/A',
        body.contactNumber,
        body.profession,
        body.profession === 'student' ? body.studentDetails.college : 'N/A',
        body.profession === 'student' ? body.studentDetails.year : 'N/A',
        new Date().toISOString(),
      ],
    ];

    try {
      // Append to Google Sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: 'Sheet1!A:J',
        valueInputOption: 'RAW',
        requestBody: { values },
      });
      console.log('Data appended to sheet:', response.data); // Debug log
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
      throw new Error('Failed to save to spreadsheet');
    }

    try {
      // Initialize email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Send confirmation email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: body.email,
        subject: 'Registration Confirmed - BITS 2025',
        html: registrationEmail(body),
      });
      console.log('Confirmation email sent'); // Debug log
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't throw error here, registration can still be considered successful
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined 
      }, 
      { status: 500 }
    );
  }
} 