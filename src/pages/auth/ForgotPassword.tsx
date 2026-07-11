import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, verifyOtp, resetPassword } from '../../api/auth.api';

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
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-center items-center p-4 md:p-8 font-sans selection:bg-fuchsia-600 selection:text-white relative overflow-hidden">
      
      {/* Absolute fine-line abstract background aesthetics */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute left-1/4 top-0 w-px h-full bg-black" />
        <div className="absolute left-3/4 top-0 w-px h-full bg-black" />
      </div>

      {/* Structured Center Box Frame matching login framework */}
      <div className="w-full max-w-xl bg-white border border-neutral-200/80 rounded-2xl p-8 md:p-12 shadow-xl shadow-neutral-100/40 relative z-10 space-y-8">
        
        {/* Dynamic Section Header Content based on active state step */}
        <div>
          <h2 className="text-xl font-black tracking-[0.25em] uppercase text-neutral-950 text-center">
            {step === 'email' && 'Recover Identity Code'}
            {step === 'otp' && 'Verification Required'}
            {step === 'password' && 'Override Security Key'}
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1 text-center">
            {step === 'email' && 'Initiate account credential override protocols.'}
            {step === 'otp' && `Enter the 6-digit access passkey deployed to ${email}`}
            {step === 'password' && 'Establish your updated encrypted credential matrix.'}
          </p>
        </div>

        {/* Error Callout Element */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50/60 border border-red-100 text-red-600 text-xs font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {error}
          </div>
        )}

        {/* STEP 1: Email Form Input Module */}
        {step === 'email' && (
          <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
            <div className="space-y-1.5 relative group">
              <label className="text-[10px] font-extrabold text-neutral-400 group-focus-within:text-neutral-950 tracking-widest uppercase transition-colors duration-200">
                Email Address
              </label>
              <input
                type="email"
                {...emailForm.register('email')}
                placeholder="name@agency.com"
                className={`w-full bg-transparent border-b-2 ${emailForm.formState.errors.email ? 'border-red-400 focus:border-red-500' : 'border-neutral-100 focus:border-neutral-950'} py-2.5 text-sm text-neutral-900 placeholder-neutral-200 outline-none transition-all duration-200 font-medium`}
              />
              {emailForm.formState.errors.email && (
                <p className="text-xs text-red-500 font-medium pt-1">
                  {emailForm.formState.errors.email.message as string}
                </p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-100 text-white disabled:text-neutral-400 font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-200 active:scale-[0.99] disabled:pointer-events-none group inline-flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
                {!loading && <span className="text-fuchsia-500 transition-transform group-hover:translate-x-1 duration-150">→</span>}
              </button>
              <Link to="/login" className="text-xs font-bold text-neutral-400 hover:text-neutral-950 transition-colors duration-150 py-1 self-start sm:self-auto">
                Return to Login
              </Link>
            </div>
          </form>
        )}

        {/* STEP 2: OTP Verification Form Input Module */}
        {step === 'otp' && (
          <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
            <div className="space-y-1.5 relative group">
              <label className="text-[10px] font-extrabold text-neutral-400 group-focus-within:text-neutral-950 tracking-widest uppercase transition-colors duration-200">
                Enter Secure OTP Token
              </label>
              <input
                type="text"
                maxLength={6}
                {...otpForm.register('otp')}
                placeholder="000000"
                className={`w-full bg-transparent border-b-2 tracking-[0.5em] text-center ${otpForm.formState.errors.otp ? 'border-red-400 focus:border-red-500' : 'border-neutral-100 focus:border-neutral-950'} py-2.5 text-lg text-neutral-900 placeholder-neutral-200 outline-none transition-all duration-200 font-bold`}
              />
              {otpForm.formState.errors.otp && (
                <p className="text-xs text-red-500 font-medium pt-1 text-center">
                  {otpForm.formState.errors.otp.message as string}
                </p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-100 text-white disabled:text-neutral-400 font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-200 active:scale-[0.99] disabled:pointer-events-none group inline-flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                {loading ? 'Authorizing Token...' : 'Verify Token'}
                {!loading && <span className="text-fuchsia-500 transition-transform group-hover:translate-x-1 duration-150">→</span>}
              </button>
              <button 
                type="button" 
                onClick={() => setStep('email')} 
                className="text-xs font-bold text-neutral-400 hover:text-neutral-950 transition-colors duration-150 py-1 self-start sm:self-auto"
              >
                Change Identity Node
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Password Reset Form Input Module */}
        {step === 'password' && (
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
            
            <div className="space-y-1.5 relative group">
              <label className="text-[10px] font-extrabold text-neutral-400 group-focus-within:text-neutral-950 tracking-widest uppercase transition-colors duration-200">
                New Security Key
              </label>
              <input
                type="password"
                {...passwordForm.register('password')}
                placeholder="••••••••"
                className={`w-full bg-transparent border-b-2 ${passwordForm.formState.errors.password ? 'border-red-400 focus:border-red-500' : 'border-neutral-100 focus:border-neutral-950'} py-2.5 text-sm text-neutral-900 placeholder-neutral-200 outline-none transition-all duration-200 font-medium`}
              />
              {passwordForm.formState.errors.password && (
                <p className="text-xs text-red-500 font-medium pt-1">
                  {passwordForm.formState.errors.password.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1.5 relative group">
              <label className="text-[10px] font-extrabold text-neutral-400 group-focus-within:text-neutral-950 tracking-widest uppercase transition-colors duration-200">
                Confirm Security Key
              </label>
              <input
                type="password"
                {...passwordForm.register('confirmPassword')}
                placeholder="••••••••"
                className={`w-full bg-transparent border-b-2 ${passwordForm.formState.errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-neutral-100 focus:border-neutral-950'} py-2.5 text-sm text-neutral-900 placeholder-neutral-200 outline-none transition-all duration-200 font-medium`}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500 font-medium pt-1">
                  {passwordForm.formState.errors.confirmPassword.message as string}
                </p>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-neutral-950 hover:bg-neutral-900 disabled:bg-neutral-100 text-white disabled:text-neutral-400 font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-200 active:scale-[0.99] disabled:pointer-events-none group inline-flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                {loading ? 'Re-encrypting...' : 'Commit Security Key'}
                {!loading && <span className="text-fuchsia-500 transition-transform group-hover:translate-x-1 duration-150">→</span>}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;