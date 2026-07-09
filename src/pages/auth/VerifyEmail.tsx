import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyEmail } from '../../api/auth.api';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  // const { updateUser } = useAuthStore();
  const navigate = useNavigate();
const { user, updateUser } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus('success');
        setMessage('Email verified successfully!');
        updateUser({ isEmailVerified: true });
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed');
      });
  }, []);

  return (
    <div>
      {status === 'loading' && <p>Verifying your email...</p>}
      {status === 'success' && (
        <div>
          <h2>✅ Email Verified Successfully!</h2>
          <p>Your email has been verified. Let's complete your profile.</p>
          <button onClick={() => navigate(
            user?.role === 'TALENT' ? '/dashboard/talent/profile-setup' : '/dashboard/recruiter/profile-setup'
          )}>
            Complete Your Profile
          </button>
        </div>
      )}
      {status === 'error' && (
        <div>
          <h2>❌ {message}</h2>
          <Link to="/login">Back to Login</Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;