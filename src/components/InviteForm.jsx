import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { sendInvite } from '../services/userInviteService';
import { getIcon } from '../utils/iconUtils';

const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await sendInvite(email, name);
      setSuccess(true);
      setEmail('');
      setName('');
      toast.success('Invitation sent successfully!');
    } catch (error) {
      console.error('Failed to send invite:', error);
      toast.error('Failed to send invitation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SendIcon = getIcon('send');
  const CheckIcon = getIcon('check-circle');
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-6 md:p-8">
      <h3 className="text-xl font-bold mb-4">Invite a Colleague</h3>
      
      {success ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
            <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-lg font-medium mb-2">Invitation Sent!</h4>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Your colleague will receive an email with instructions to join.
          </p>
          <button 
            onClick={() => setSuccess(false)} 
            className="btn-primary"
          >
            Send Another Invite
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Colleague's Name (Optional)</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" placeholder="colleague@company.com" />
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Sending...' : <><SendIcon className="w-4 h-4 mr-2" /> Send Invitation</>}
          </button>
        </form>
      )}
    </div>
  );
};

export default InviteForm;