'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, UserRound } from 'lucide-react';
import { Switch } from '../ui/switch';
import { PulsatingButton } from '../magicui/pulsating-button';
import { ShinyButton } from '../magicui/shiny-button';
import { ScrollProgress } from '../ScrollProgress';
import axios from 'axios';
import { ModeToggle } from '../mode-toggle';

export default function ReportHeader({ isPremium, setIsPremium, containerRef }) {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { VITE_API_URL } = import.meta.env;
  const { RAZORPAY_KEY_ID } = import.meta.env;
  const [isLoading, setIsLoading] = useState(false);


  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const data = await axios.post(`${VITE_API_URL}/interview/create_order`, { headers:  { Authorization: `Bearer ${localStorage.getItem('token')}`} });
      console.log(data);
      if (!data) {
        alert("Error creating order");
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Your Company",
        description: "Upgrade to Premium",
        order_id: data.order.id,
        handler: async function (response) {
          const verifyRes = await axios.post(`${VITE_API_URL}/interview/verify_order`, response);
          if (verifyRes.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed!");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sm:fixed sm:top-0 sm:left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-md transition-all"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-2">

          <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
            <div className='flex gap-4'>
            <div className="rounded-full border border-gray-50 self-start md:self-auto">
              <UserRound className="w-8 h-8" />
            </div>
              <h1 className="text-xl md:text-2xl font-bold flex flex-wrap items-center gap-2">
                Interview Report
              </h1>
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground flex md:hidden gap-2">
                  <span>John Doe</span>
                  <span>•</span>
                  <span>Technical Interview</span>
                  <span>•</span>
                  <span>Feb 26, 2025</span>
                </span>

              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span>John Doe</span>
                <span>•</span>
                <span>Technical Interview</span>
                <span>•</span>
                <span>Feb 26, 2025</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground hidden md:block"
              >
                Unlock detailed analysis and resources
              </motion.div>
            )}

            <div className="flex items-center gap-3">
              <ModeToggle />
              <div >
                <Switch
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                  className="data-[state=checked]:bg-gradient-to-r from-primary to-primary/80"
                />
              </div>

              <span className="text-sm font-medium">
                {isPremium ? (
                  <motion.div className="flex items-center gap-1" layout>
                    <ShinyButton>Premium Report</ShinyButton>
                  </motion.div>
                ) : (
                  <motion.div className="flex items-center gap-1" layout>
                    <PulsatingButton onClick={handlePayment}>Upgrade to Premium</PulsatingButton>
                  </motion.div>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ScrollProgress
        className={`absolute top-${headerHeight} h-1 bg-gradient-to-l from-blue-500 to-blue-600"`}
        containerRef={containerRef}
      />
    </header>
  );
}
