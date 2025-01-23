import { db, auth } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import { registrationEmail } from '@/utils/emailTemplates';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received registration data:', body);

    // Verify the authentication token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      await auth.verifyIdToken(token);
    } catch (error) {
      return Response.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    try {
      // Add to Firebase
      const docRef = await addDoc(collection(db, 'attendees'), {
        ...body,
        registeredAt: new Date().toISOString(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (firebaseError) {
      console.error('Firebase error:', firebaseError);
      throw new Error('Failed to save registration');
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
      console.log('Confirmation email sent');
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