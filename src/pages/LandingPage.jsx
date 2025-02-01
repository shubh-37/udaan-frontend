import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, BarChart, Briefcase, Users, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Marquee } from '@/components/ui/marquee';
import bhartiAXA from '../assets/bhartiAXA.svg';
import { useContext, useState } from 'react';
import InterviewForm from '../shared/InterviewForm';
import Loader from '../shared/Loader';
import { authContext } from '../context/AuthContextProvider';
import UserProfileForm from '../shared/UserProfileForm';
import companyLogo1 from '../assets/companylogo1.png';
import companyLogo2 from '../assets/companyLogo2.png';
import companyLogo3 from '../assets/companyLogo3.png';
import companyLogo4 from '../assets/companyLogo4.png';
import companyLogo5 from '../assets/companyLogo5.png';
import companyLogo6 from '../assets/companyLogo6.png';
import companyLogo7 from '../assets/companyLogo7.png';
import companyLogo8 from '../assets/companyLogo8.png';
import companyLogo9 from '../assets/companyLogo9.png';

export default function LandingPage() {
  const token = localStorage.getItem('token');
  const { updateProfile, setUpdateProfile } = useContext(authContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controls Drawer visibility
  return (
    <div className="flex flex-col min-h-screen">
      {isOpen && <InterviewForm isOpen={isOpen} setIsOpen={setIsOpen} setIsLoading={setIsLoading} />}
      {isLoading && <Loader text={'Preparing Interview...'} />}
      {updateProfile && <UserProfileForm isOpen={updateProfile} setIsOpen={setUpdateProfile} />}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b justify-between">
        <Link className="flex items-center justify-center" to="/">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-br from-blue-600 via-green-600 to-purple-600 text-transparent bg-clip-text">
            PrepSOM
          </span>
        </Link>
        <div className='flex items-center gap-4'>
        <Link to = '/blogs' className='font-semibold hover:text-blue-600 hover:duration-300 hover:underline hover:underline-offset-4'>Blogs</Link>
        {token && (
          <div className="flex items-center gap-3">
            {' '}
            <Button onClick={logout}>Log out</Button>
            <User onClick={() => setUpdateProfile(true)} className="h-6 w-6 text-blue-600 cursor-pointer" />
          </div>
        )}
        {!token && (
          <Link to="/login">
            <Button size="lg" className="bg-black text-white">
              Login{' '}
            </Button>
          </Link>
        )}
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-20 xl:py-36 bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6 max-w-[1200px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ace Your Next Interview with PrepSOM
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Practice makes perfect. Simulate real interviews, get AI-powered feedback, and land your dream job.
                </p>
              </div>
              <div className="space-x-4 space-y-2">
                {token ? (
                  <Button size="lg" className="bg-black text-white" onClick={() => setIsOpen(true)}>
                    Start Interview
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button size="lg" className="bg-black text-white">
                      Start Interview{' '}
                    </Button>
                  </Link>
                )}
                <a href="https://youtu.be/F-UwrlXrsqM" target="_blank">
                  <Button variant="outline" size="lg" className="text-white">
                    Watch Demo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full flex justify-center py-12">
          <div className="container px-4 md:px-6 max-w-[1200px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              <Card>
                <CardHeader>
                  <Video className="w-8 h-8 mb-2 text-blue-600" />
                  <CardTitle>Realistic Interview Simulations</CardTitle>
                </CardHeader>
                <CardContent>
                  Experience lifelike interview scenarios with our advanced AI-powered virtual interviewers.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Briefcase className="w-8 h-8 mb-2 text-blue-600" />
                  <CardTitle>Industry-Trained Model</CardTitle>
                </CardHeader>
                <CardContent>
                  Benefit from our AI model trained on real industry insights and current job market trends.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart className="w-8 h-8 mb-2 text-blue-600" />
                  <CardTitle>Detailed Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  Receive comprehensive feedback on your responses, body language, and overall performance.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 mb-2 text-blue-600" />
                  <CardTitle>Direct Access to Recruiters</CardTitle>
                </CardHeader>
                <CardContent>
                  Connect with top recruiters and increase your chances of landing your dream job.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Model Trained by Professionals From:
            </h2>
            <Marquee pauseOnHover className="[--duration:10s] flex gap-5">
              <img src={bhartiAXA} alt="" width={120} height={60} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Milliman_logo.svg" alt="" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Mercer_h_rgb_c.svg"
                alt=""
                width={120}
                height={60}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg"
                alt=""
                width={120}
                height={60}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/39/Marsh_%26_McLennan_Companies_logo.svg"
                alt=""
                width={120}
                height={60}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/PricewaterhouseCoopers_Logo.svg"
                alt=""
                width={120}
                height={60}
              />
            </Marquee>
          </div>
        </section>
        <section
          id="partner institutes"
          className="w-full flex flex-col justify-center flex-wrap items-center py-6 md:py-12 lg:py-24"
        >
          <div className="font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8">Partner Institutes</div>
          <div className="flex flex-wrap items-center justify-center gap-8 container">
            <Marquee pauseOnHover className="[--duration:10s] flex gap-5">
              <img src={companyLogo2} alt="" width={120} height={60} />
              <img src={companyLogo3} alt="" width={120} height={60} />
              <img src={companyLogo4} alt="" width={120} height={60} />
              <img src={companyLogo5} alt="" width={120} height={60} />
              <img src={companyLogo6} alt="" width={120} height={60} />
              <img src={companyLogo7} alt="" width={120} height={60} />
              <img src={companyLogo8} alt="" width={120} height={60} />
              <img src={companyLogo9} alt="" width={120} height={60} />
            </Marquee>
          </div>
        </section>
        <section id="how-it-works" className="w-full flex justify-center py-6 md:py-12 lg:py-24 ">
          <div className="container px-4 md:px-6 max-w-[1200px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Interview</h3>
                <p>Select from various job roles and difficulty levels to tailor your practice session.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice with AI</h3>
                <p>Engage in a realistic interview with our AI-powered virtual interviewer.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Instant Feedback</h3>
                <p>Receive detailed analysis and suggestions to improve your interview skills.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex justify-center py-12 md:py-12 lg:py-20 bg-blue-600 text-white">
          <div className="container px-4 md:px-6 max-w-[1200px] text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="mx-auto max-w-[700px] text-lg mb-8">
              Join thousands of job seekers who have improved their interview skills with PrepSOM.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary">
              <Link to="/interview">Start Practicing</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
