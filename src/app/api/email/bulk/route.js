import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import { bulkEmail } from '@/utils/emailTemplates';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { subject, content } = await req.json();

    // Get all emails from Firebase
    const querySnapshot = await getDocs(collection(db, 'attendees'));
    const emails = querySnapshot.docs.map(doc => doc.data().email);

    // Send emails in batches of 50
    const batchSize = 50;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      await Promise.all(
        batch.map(email =>
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: bulkEmail(subject, content),
          })
        )
      );
      // Wait 1 second between batches to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return Response.json({ success: true, emailsSent: emails.length });
  } catch (error) {
    console.error('Bulk email error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
} 