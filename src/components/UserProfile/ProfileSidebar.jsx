import { useContext, useState, useEffect, useRef } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar';
import { IconArrowLeft, IconBrandTabler, IconUserBolt } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import InsightsSection from './ProfileInsights';
import PerformanceDashboard from './TestDashboard';
import UserProfileDashboard from './UserDashboard';
import FormalImage from '../../assets/FormalImage.png';
import { ProfileOverview } from './ProfileOverview';
import ProfileSections from './ProfileFields';
import { profileContext } from '@/context/ProfileContextProvider';
import { UserRound } from 'lucide-react';

export function SidebarDemo() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [open, setOpen] = useState(false);
  const profileRef = useRef(false);
  const { getProfile, getAptitudeScores, getDashboardData, profile } = useContext(profileContext);

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    if (profileRef.current) return;
    const fetchData = async () => {
      try {
        profileRef.current = true;
        const profilePromise = getProfile();
        const aptitudeScoresPromise = getAptitudeScores();
        const dashboardDataPromise = getDashboardData({ topics: [] }); 

        await Promise.all([
          profilePromise,
          aptitudeScoresPromise,
          dashboardDataPromise,
        ]);

      } catch (error) {
        toast.error('Error submitting test');
      }
      return () => {
        console.log('ResultPage component unmounting, submission status:', profileRef.current);
      };
    };
    fetchData();
  }, [getProfile, getAptitudeScores, getDashboardData]);
  const links = [
    {
      label: 'Dashboard',
      onClick: () => setActiveSection('Dashboard'),
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: 'Profile',
      onClick: () => setActiveSection('Profile'),
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    // {
    //   label: 'Settings',
    //   onClick: () => setActiveSection('Settings'),
    //   icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    // },
    {
      label: 'Logout',
      onClick: logout,
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    }
  ];

  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-background w-full flex-1 border overflow-hidden',
        'h-screen overflow-y-auto scrollbar-hide'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={{ label: link.label, icon: link.icon, onClick: link.onClick }} />
              ))}
            </div>
          </div>
          <div>
            {/* change the image source to the user's profile image */}
            <SidebarLink
              link={{
                label: profile?.name || 'John Doe',
                href: '#',
                icon: (
                  <UserRound className='w-4 h-4' />
                )
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1 flex-col space-y-6 w-full mx-auto max-w-7xl overflow-y-scroll scrollbar-hide">
        {activeSection === 'Dashboard' && (
          <>
            <UserProfileDashboard />
            <InsightsSection />
            <PerformanceDashboard />
          </>
        )}
        {activeSection === 'Profile' && (
          <>
            <ProfileOverview />
            <ProfileSections />
          </>
        )}
        {/* {activeSection === 'Settings' && <ProfileSettings />} */}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link to="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <img src="/favicon.ico" alt="logo" className="h-5 w-5 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Prepsom Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link to="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <img src="/favicon.ico" alt="logo" className="h-5 w-5 flex-shrink-0" />
    </Link>
  );
};

// Dashboard UI
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={'first-array' + i}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={'second-array' + i}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
