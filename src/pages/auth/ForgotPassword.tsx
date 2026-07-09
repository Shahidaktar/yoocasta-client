import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { forgotPassword, verifyOtp, resetPassword } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

const emailSchema = z.object({ email: z.string().email('Valid email required') });
const otpSchema = z.object({ otp: z.string().length(6, 'OTP must be 6 digits') });
const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must contain uppercase, lowercase and number'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailForm = useForm({ resolver: zodResolver(emailSchema) });
  const otpForm = useForm({ resolver: zodResolver(otpSchema) });
  const passwordForm = useForm({ resolver: zodResolver(passwordSchema) });

  const handleEmailSubmit = async (data: any) => {
    try {
      setLoading(true); setError('');
      await forgotPassword(data.email);
      setEmail(data.email);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const handleOtpSubmit = async (data: any) => {
    try {
      setLoading(true); setError('');
      await verifyOtp({ email, otp: data.otp });
      setStep('password');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const handlePasswordSubmit = async (data: any) => {
    try {
      setLoading(true); setError('');
      await resetPassword({ email, otp: otpForm.getValues('otp'), password: data.password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {step === 'email' && (
        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)}>
          <div>
            <label>Email</label>
            <input type="email" {...emailForm.register('email')} />
            {emailForm.formState.errors.email && <p style={{ color: 'red' }}>{emailForm.formState.errors.email.message as string}</p>}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)}>
          <p>OTP sent to {email}</p>
          <div>
            <label>Enter OTP</label>
            <input {...otpForm.register('otp')} maxLength={6} />
            {otpForm.formState.errors.otp && <p style={{ color: 'red' }}>{otpForm.formState.errors.otp.message as string}</p>}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify OTP'}</button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
          <div>
            <label>New Password</label>
            <input type="password" {...passwordForm.register('password')} />
            {passwordForm.formState.errors.password && <p style={{ color: 'red' }}>{passwordForm.formState.errors.password.message as string}</p>}
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" {...passwordForm.register('confirmPassword')} />
            {passwordForm.formState.errors.confirmPassword && <p style={{ color: 'red' }}>{passwordForm.formState.errors.confirmPassword.message as string}</p>}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
        </form>
      )}

      <p><Link to="/login">Back to Login</Link></p>
    </div>
  );
};

export default ForgotPassword;