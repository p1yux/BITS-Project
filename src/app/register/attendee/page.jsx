"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import AttendeeRegistration from '@/components/custom/Forms/AttendeeRegistration';
import RegistrationSummary from '@/components/custom/Forms/RegistrationSummary';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);

  return (
    <main className="min-h-screen bg-black">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative container mx-auto px-6 h-screen flex items-center justify-center">
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