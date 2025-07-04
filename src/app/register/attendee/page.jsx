"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/custom/Navigation/Navbar';
import AttendeeRegistration from '@/components/custom/Forms/AttendeeRegistration';
import RegistrationSummary from '@/components/custom/Forms/RegistrationSummary';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        try {
          await signInWithGoogle();
        } catch (error) {
          console.error('Authentication failed:', error);
          router.push('/');
        }
      }
    };

    checkAuth();
  }, [user, signInWithGoogle, router]);

  useEffect(() => {
    const checkExistingRegistration = async () => {
      if (user) {
        try {
          const registrationsRef = collection(db, 'attendees');
          const q = query(registrationsRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const existingData = querySnapshot.docs[0].data();
            setRegistrationData(existingData);
            setStep(2);
          }
        } catch (error) {
          console.error('Error checking registration:', error);
        }
      }
    };

    checkExistingRegistration();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-center"
        >
          Authenticating...
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative container mx-auto px-6 py-20 flex items-center justify-center">
        {step === 1 ? (
          <AttendeeRegistration 
            onComplete={(data) => {
              setRegistrationData(data);
              setStep(2);
            }}
          />
        ) : (
          <RegistrationSummary 
            data={registrationData}
          />
        )}
      </div>
    </main>
  );
} 