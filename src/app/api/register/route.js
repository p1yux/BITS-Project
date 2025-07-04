import { adminAuth } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export async function POST(req) {
  // Always set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }), 
        { status: 405, headers }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON payload' }), 
        { status: 400, headers }
      );
    }

    const token = req.headers.get('authorization')?.split('Bearer ')[1];
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'No token provided' }), 
        { status: 401, headers }
      );
    }

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (authError) {
      console.error('Token verification failed:', authError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid authentication token',
          details: authError.message 
        }), 
        { status: 401, headers }
      );
    }

    const adminDb = getFirestore();
    
    // Check for existing registration
    const existingReg = await adminDb
      .collection('attendees')
      .where('userId', '==', decodedToken.uid)
      .get();

    if (!existingReg.empty) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'You have already registered for this event' 
        }), 
        { status: 400, headers }
      );
    }

    // Save to Firestore
    const docRef = await adminDb.collection('attendees').add({
      ...body,
      userId: decodedToken.uid,
      registeredAt: new Date().toISOString(),
      status: 'pending',
      emailVerified: decodedToken.email_verified,
      passType: body.passType || 'student',
      passPrice: body.passPrice || 500
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        registrationId: docRef.id 
      }), 
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }), 
      { status: 500, headers }
    );
  }
} 