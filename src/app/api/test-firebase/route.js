import { adminAuth } from '@/lib/firebase-admin';

export async function GET() {
  try {
    // Try to list users (this will fail if admin SDK is not set up correctly)
    await adminAuth.listUsers(1);
    return Response.json({ success: true, message: 'Firebase Admin is working!' });
  } catch (error) {
    console.error('Firebase Admin test failed:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 