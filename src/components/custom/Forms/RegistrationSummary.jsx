"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const RegistrationSummary = ({ data }) => {
  const router = useRouter();
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamMember, setTeamMember] = useState({
    name: '',
    email: '',
    role: ''
  });

  const handleFinish = () => {
    router.push('/landing');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
      {/* Registration Summary Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="apple-glass rounded-3xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Registration Summary</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Full Name</p>
            <p className="text-white">{data.fullName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-white">{data.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Gender</p>
            <p className="text-white">{data.gender}</p>
          </div>
          <div>
            <p className="text-gray-400">Location</p>
            <p className="text-white">{data.state}, {data.country}</p>
          </div>
          <div>
            <p className="text-gray-400">Contact</p>
            <p className="text-white">{data.contactNumber}</p>
          </div>
          <div>
            <p className="text-gray-400">Profession</p>
            <p className="text-white">{data.profession}</p>
          </div>
          {data.profession === 'student' && (
            <div>
              <p className="text-gray-400">College Details</p>
              <p className="text-white">{data.studentDetails.college} - Year {data.studentDetails.year}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Team Member Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="apple-glass rounded-3xl p-8 flex flex-col"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Add Team Member (Optional)</h2>
        {!showTeamForm ? (
          <div className="flex flex-col gap-4 h-full">
            <motion.button
              onClick={() => setShowTeamForm(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-full font-semibold border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10"
            >
              Add Team Member
            </motion.button>
            <motion.button
              onClick={handleFinish}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-full font-semibold bg-green-600 hover:bg-green-700 text-white mt-auto"
            >
              Finish Registration
            </motion.button>
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={teamMember.name}
                onChange={(e) => setTeamMember({...teamMember, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={teamMember.email}
                onChange={(e) => setTeamMember({...teamMember, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-200 text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                value={teamMember.role}
                onChange={(e) => setTeamMember({...teamMember, role: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Member
              </motion.button>
              <motion.button
                type="button"
                onClick={handleFinish}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 rounded-full font-semibold bg-green-600 hover:bg-green-700 text-white"
              >
                Finish
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default RegistrationSummary; 