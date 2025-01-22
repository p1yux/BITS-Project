"use client"
import { useState } from 'react';

export default function AdminDashboard() {
  const [emailData, setEmailData] = useState({ subject: '', content: '' });
  const [loading, setLoading] = useState(false);

  const sendBulkEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/email/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      });
      const data = await res.json();
      alert(data.success ? 
        `Successfully sent to ${data.emailsSent} recipients` : 
        'Failed to send emails');
    } catch (error) {
      alert('Error sending emails');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <form onSubmit={sendBulkEmail} className="space-y-4">
        <div>
          <label className="block mb-2">Subject</label>
          <input
            type="text"
            value={emailData.subject}
            onChange={e => setEmailData(p => ({ ...p, subject: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2">Content (HTML supported)</label>
          <textarea
            value={emailData.content}
            onChange={e => setEmailData(p => ({ ...p, content: e.target.value }))}
            className="w-full p-2 border rounded h-48"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Bulk Email'}
        </button>
      </form>
    </div>
  );
} 