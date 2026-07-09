import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { resendVerification } from '../../api/auth.api';
import api from '../../api/axios';

const VerifyEmailOtp = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    try {
      setLoading(true);
      setError('');
      await api.post('/auth/verify-email-otp', { email: user.email, otp });
      updateUser({ isEmailVerified: true });
      navigate(user.role === 'TALENT' ? '/dashboard/talent/profile-setup' : '/dashboard/recruiter');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!user?.email) return;
    try {
      await resendVerification(user.email);
      setResent(true);
      setTimeout(() => setResent(false), 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>We sent a 6-digit OTP to <strong>{user?.email}</strong></p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {resent && <p style={{ color: 'green' }}>OTP resent successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter OTP</label>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
          />
        </div>
        <button type="submit" disabled={loading || otp.length !== 6}>
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
      <p>
        Didn't receive OTP?{' '}
        <button onClick={handleResend} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue' }}>
          Resend OTP
        </button>
      </p>
    </div>
  );
};

export default VerifyEmailOtp;