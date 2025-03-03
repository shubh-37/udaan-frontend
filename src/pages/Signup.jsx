'use client';

import { useEffect } from 'react';

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContextProvider';
import Loader from '../shared/Loader';
import { Video, ArrowRight, LoaderIcon, Mail, User } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SignupForm = () => {
  const { signUpUser, verifySignUpOtp } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [step, setStep] = useState('details'); // 'details' or 'verify'
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    emailOtp: '',
    phoneOtp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value
    }));
  };

  const validateDetails = () => {
    if (!formData.full_name.trim()) {
      toast('Error', {
        variant: 'destructive',
        description: 'Please enter your name'
      });
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast('Error', {
        variant: 'destructive',
        description: 'Please enter a valid email address'
      });
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      toast('Error', {
        variant: 'destructive',
        description: 'Please enter a valid phone number'
      });
      return false;
    }
    return true;
  };

  const handleSendOTP = async (e) => {
    try {
      e.preventDefault();
      if (!validateDetails()) return;

      setIsLoading(true);
      const response = await signUpUser({
        name: formData.full_name,
        email: formData.email,
        mobile_number: formData.phone.slice(2),
        country_code: formData.phone.slice(0, 2)
      });
      setStep('verify');
      toast('OTP Sent', {
        description: 'Please check your email and phone for verification codes'
      });
    } catch (error) {
      toast('Error', {
        variant: 'destructive',
        description: 'Failed to send OTP. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.emailOtp || !formData.phoneOtp) {
        toast('Error', {
          variant: 'destructive',
          description: 'Please enter both verification codes'
        });
        return;
      }

      setIsLoading(true);

      const response = await verifySignUpOtp({
        email: formData.email,
        email_otp: formData.emailOtp,
        mobile_otp: formData.phoneOtp
      });
      console.log(response);
      if (response === 'success') {
        navigate('/profile');
      } else if (response === 'failure') {
        toast('Error', {
          variant: 'destructive',
          description: 'Error signing up, please try again.'
        });
      } else {
        toast('Error', {
          variant: 'destructive',
          description: 'Account already exists with this email or phone.'
        });
      }
    } catch (error) {
      toast('Error', {
        variant: 'destructive',
        description: 'An error occurred, please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-black">
      {isLoading && <Loader text={step === 'details' ? 'Sending OTP...' : 'Creating Account...'} />}

      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-background dark:bg-black">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </header>

      <div className="w-full px-2 mx-auto flex-grow flex items-center justify-center m-4">
        {step === 'details' ? (
          <Card className="w-full max-w-md border-gray-50 shadow-lg bg-white dark:bg-black dark:border-gray-900 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Enter your details to get started</CardDescription>
            </CardHeader>
            <form onSubmit={handleSendOTP}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="full_name"
                        name="full_name"
                        placeholder="John Doe"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="phone-input-container">
                      <PhoneInput
                        country={'in'}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputProps={{
                          id: 'phone',
                          required: true,
                          className:
                            'w-full h-10 rounded-md border border-input bg-white dark:bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                        }}
                        containerClass="w-full"
                        buttonClass="border rounded-l-md h-10"
                        buttonStyle={{
                          backgroundColor: 'white',
                          borderTopLeftRadius: '1rem',
                          borderBottomLeftRadius: '1rem',
                          borderTopRightRadius: '0',
                          borderBottomRightRadius: '0',
                          transition: 'all 0.3s ease'
                        }}
                        dropdownClass="bg-white/90 text-card-foreground"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-black dark:text-black dark:bg-white" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link className="text-primary underline-offset-4 hover:underline" to="/login">
                    Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="w-full max-w-lg border-gray-50 shadow-lg bg-white dark:bg-black dark:border-gray-900 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Verify Your Account</CardTitle>
              <CardDescription>Enter the verification codes sent to your email and phone</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Email Verification Code</Label>
                    <div className="flex justify-center gap-4 py-4">
                      {[0, 1, 2, 3].map((index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          name={`email-otp-${index}`}
                          value={formData.emailOtp.charAt(index) || ''}
                          onChange={(e) => {
                            // Remove any non-digit characters
                            const value = e.target.value.replace(/\D/g, '');

                            // Only proceed if input is a digit or empty
                            if (value.length <= 1) {
                              const newOtp = formData.emailOtp.split('');
                              newOtp[index] = value;
                              setFormData((prev) => ({ ...prev, emailOtp: newOtp.join('') }));

                              // If a digit was entered and there's a next input, focus it
                              if (value && index < 3) {
                                const nextInput = document.querySelector(`input[name=email-otp-${index + 1}]`);
                                if (nextInput) {
                                  nextInput.focus();
                                }
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !formData.emailOtp.charAt(index) && index > 0) {
                              // If current input is empty and backspace was pressed, focus previous input
                              const prevInput = document.querySelector(`input[name=email-otp-${index - 1}]`);
                              if (prevInput) {
                                prevInput.focus();
                              }
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

                            setFormData((prev) => ({ ...prev, emailOtp: pastedData.padEnd(4, '').slice(0, 4) }));

                            // Focus the next empty input or the last input if all are filled
                            const nextEmptyIndex = pastedData.length < 4 ? pastedData.length : 3;
                            const inputToFocus = document.querySelector(`input[name=email-otp-${nextEmptyIndex}]`);
                            if (inputToFocus) {
                              inputToFocus.focus();
                            }
                          }}
                          className="w-12 h-12 text-center text-2xl p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          maxLength={1}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Verification Code</Label>
                    <div className="flex justify-center gap-4 py-4">
                      {[0, 1, 2, 3].map((index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          name={`phone-otp-${index}`}
                          value={formData.phoneOtp.charAt(index) || ''}
                          onChange={(e) => {
                            // Remove any non-digit characters
                            const value = e.target.value.replace(/\D/g, '');

                            // Only proceed if input is a digit or empty
                            if (value.length <= 1) {
                              const newOtp = formData.phoneOtp.split('');
                              newOtp[index] = value;
                              setFormData((prev) => ({ ...prev, phoneOtp: newOtp.join('') }));

                              // If a digit was entered and there's a next input, focus it
                              if (value && index < 3) {
                                const nextInput = document.querySelector(`input[name=phone-otp-${index + 1}]`);
                                if (nextInput) {
                                  nextInput.focus();
                                }
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !formData.phoneOtp.charAt(index) && index > 0) {
                              const prevInput = document.querySelector(`input[name=phone-otp-${index - 1}]`);
                              if (prevInput) {
                                prevInput.focus();
                              }
                            }
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

                            setFormData((prev) => ({ ...prev, phoneOtp: pastedData.padEnd(4, '').slice(0, 4) }));

                            // Focus the next empty input or the last input if all are filled
                            const nextEmptyIndex = pastedData.length < 4 ? pastedData.length : 3;
                            const inputToFocus = document.querySelector(`input[name=phone-otp-${nextEmptyIndex}]`);
                            if (inputToFocus) {
                              inputToFocus.focus();
                            }
                          }}
                          className="w-12 h-12 text-center text-2xl p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          maxLength={1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !formData.emailOtp || !formData.phoneOtp}
                >
                  {isLoading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setStep('details')} className="w-full">
                  Change Details
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
