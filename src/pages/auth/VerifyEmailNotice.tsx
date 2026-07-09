import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { resendVerification } from '../../api/auth.api';

const VerifyEmailNotice = () => {
  const { user } = useAuthStore();
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      await resendVerification(user.email);
      setResent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>We sent a verification link to <strong>{user?.email}</strong></p>
      <p>Please check your inbox and click the link to verify your email.</p>
      {resent && <p style={{ color: 'green' }}>Verification email resent successfully!</p>}
      <button onClick={handleResend} disabled={loading || resent}>
        {loading ? 'Sending...' : resent ? 'Email Sent ✅' : 'Resend Verification Email'}
      </button>
    </div>
  );
};

export default VerifyEmailNotice;