import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import Loader from '../shared/Loader';
import { Video, ArrowRight, LoaderIcon } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
  const { loginUser, verifyLoginOtp, resendOtp } = useContext(authContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [otpValues, setOtpValues] = useState(['', '', '', '']);

  // Handle countdown for resend OTP
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(30);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const handleSendOTP = async (e) => {
    try {
      e.preventDefault();
      if (!phone || phone.length < 10) {
        alert('Please enter a valid phone number');
        return;
      }

      setIsLoading(true);
      const response = await loginUser({ mobile_number: phone.slice(2), country_code: phone.slice(0, 2) });
      setStep('otp');
      setResendDisabled(true);
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await resendOtp({ mobile_number: phone.slice(2), country_code: phone.slice(0, 2) });

      setResendDisabled(true);
    } catch (error) {
      alert('Failed to resend OTP. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    try {
      e.preventDefault();
      if (!otp || otp.length !== 4) {
        alert('Please enter a valid OTP');
        return;
      }

      setIsLoading(true);
      // Replace with your actual OTP verification logic
      const response = await verifyLoginOtp({ mobile_number: phone.slice(2), country_code: phone.slice(0, 2), otp });

      console.log(response);
      navigate('/');
    } catch (error) {
      alert('Invalid OTP. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle OTP input
  const handleOtpChange = (index, value) => {
    // Remove any non-digit characters
    value = value.replace(/\D/g, '');

    // Only proceed if input is a digit or empty
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setOtp(newOtpValues.join('')); // Update the main OTP state

      // If a digit was entered and there's a next input, focus it
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      // If current input is empty and backspace was pressed, focus previous input
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newOtpValues = [...otpValues];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 4) {
        newOtpValues[i] = pastedData[i];
      }
    }

    setOtpValues(newOtpValues);
    setOtp(newOtpValues.join(''));

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newOtpValues.findIndex((value) => !value);
    const inputToFocus = document.querySelector(`input[name=otp-${nextEmptyIndex !== -1 ? nextEmptyIndex : 3}]`);
    if (inputToFocus) {
      inputToFocus.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {isLoading && <Loader text={step === 'phone' ? 'Sending OTP...' : 'Verifying OTP...'} />}

      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between bg-card">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <Link to="/sign-up">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </header>

      <div className="flex-grow flex items-center justify-center m-4">
        {step === 'phone' ? (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your phone number to receive an OTP</CardDescription>
            </CardHeader>
            <form onSubmit={handleSendOTP}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="phone-input-container">
                      <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={setPhone}
                        inputProps={{
                          id: 'phone',
                          required: true,
                          className:
                            'w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                        }}
                        containerClass="w-full"
                        buttonClass="border rounded-l-md h-10 bg-background"
                        buttonStyle={{
                          borderTopLeftRadius: '1rem',
                          borderBottomLeftRadius: '1rem',
                          borderTopRightRadius: '0',
                          borderBottomRightRadius: '0',
                          transition: 'all 0.3s ease'
                        }}
                        dropdownClass="bg-popover text-popover-foreground"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link className="text-primary underline-offset-4 hover:underline" to="/sign-up">
                    Sign Up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>We've sent a 4-digit OTP to {phone}</CardDescription>
            </CardHeader>
            <form onSubmit={handleVerifyOTP}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Enter OTP</Label>
                    <div className="flex justify-center gap-4 py-4">
                      {otpValues.map((value, index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          name={`otp-${index}`}
                          value={value}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="w-12 h-12 text-center text-2xl p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          maxLength={1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading || otpValues.some((v) => !v)}>
                  {isLoading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Verifying OTP
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={resendDisabled || isLoading}
                  className="w-full"
                >
                  {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep('phone');
                    setOtpValues(['', '', '', '']);
                    setOtp('');
                  }}
                  className="w-full"
                >
                  Change Phone Number
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
