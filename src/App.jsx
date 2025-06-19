'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Confetti from 'react-confetti';
import { Toaster, toast } from 'react-hot-toast';
import dummyImage from '/dummy-dp.jpg';
import { motion, AnimatePresence } from 'framer-motion';

export default function CirclefolkWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAlreadyOnWaitlist, setShowAlreadyOnWaitlist] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/waitlist-count')
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch((err) => {
        console.error('Failed to fetch count:', err);
      });
  }, []);

  const handleSubmit = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const endpoint =
        import.meta.env.DEV
          ? 'http://localhost:8888/.netlify/functions/waitlist'
          : '/.netlify/functions/waitlist';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setShowCelebration(true);
        setEmail('');
        setTimeout(() => {
          window.location.href = 'https://handles.circlefolk.com';
        }, 6000);
      } else if (res.status === 409) {
        // Handle duplicate email
        toast.error('This email is already on the waitlist!');
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong.');
    }
  };

  // 🧠 Auto redirect after celebration
  useEffect(() => {
    if (showCelebration) {
      const timeout = setTimeout(() => {
        window.location.href = 'https://handles.circlefolk.com';
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [showCelebration]);

  // 🫧 Ripple effect
  useEffect(() => {
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
      card.addEventListener('click', function (e) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(199, 108, 44, 0.2);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          z-index: 1;
        `;

        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }, []);

  // 🎈 Floating bubbles (static across renders)
  const bubbles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const size = 10 + Math.floor(Math.random() * 30);
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = i * 0.5;
      return (
        <div
          key={i}
          className="absolute rounded-full bg-[#c76c2c40] animate-particleFloat"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`
          }}
        />
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefd8] via-[#f5e6c8] to-[#feefd8] animate-gradientShift relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {bubbles}
      </div>

      {/* Celebration Screen */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 bg-[#feefd8] flex flex-col items-center justify-center z-50 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti numberOfPieces={400} recycle={false} />

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-[#c76c2c]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              🎉 Wow!! You're on the waitlist!
            </motion.h1>

            <motion.p
              className="mt-4 text-2xl md:text-4xl font-semibold text-[#c76c2c]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Check out our Handles. <br /> Stay tuned for more!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center">
        <img src={dummyImage} alt="Circlefolk Logo" className="w-32 h-32 rounded-full object-cover mb-8 shadow-lg" />
        <p className="text-2xl md:text-3xl font-medium text-[#c76c2c] mb-2">Circlefolk Waitlist</p>
        <p className="text-lg text-[#c76c2c] opacity-80 max-w-xl mx-auto mb-10">
          Join the revolution of hyperlocal social networking where your neighborhood becomes your network
        </p>

        {/* Only show form if not submitted and not showing already on waitlist */}
        {!submitted && !showAlreadyOnWaitlist && (
          <div className="w-full max-w-md mb-6">
            <div className="bg-white/80 backdrop-blur-lg border border-[#c76c2c26] rounded-2xl p-8">
              <h3 className="font-bold text-[#c76c2c] text-xl mb-4 text-center">Get notified on app release</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl border border-[#c76c2c26] bg-white/60 text-[#c76c2c] placeholder-[#c76c2c]/50 focus:outline-none focus:ring-2 focus:ring-[#c76c2c] focus:border-transparent transition-all"
              />
              <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-gradient-to-r from-[#c76c2c] to-[#e8944a] text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </div>
        )}

        {/* Already on waitlist question */}
        {!submitted && !showAlreadyOnWaitlist && (
          <div className="mb-12">
            <button
              onClick={() => setShowAlreadyOnWaitlist(true)}
              className="text-[#c76c2c] underline hover:text-[#e8944a] transition-colors duration-300 text-lg"
            >
              Already on the waitlist?
            </button>
          </div>
        )}

        {/* Show two boxes when "Already on waitlist" is clicked */}
        <AnimatePresence>
          {showAlreadyOnWaitlist && (
            <motion.div
              className="w-full max-w-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Google Sheets Box */}
                <motion.div
                  className="link-card group relative bg-white/80 backdrop-blur-lg border border-[#c76c2c26] rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#34a853]/5 to-[#0f9d58]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-5xl font-extrabold text-[#c76c2c] mb-4">
                      {count !== null ? count.toLocaleString() : '--'}
                    </div>
                    <h3 className="font-bold text-[#c76c2c] text-xl mb-2">You're not alone!</h3>
                    <p className="text-[#c76c2c] opacity-70">
                       Count of people that have already joined the waitlist.
                    </p>
                  </div>
                </motion.div>

                {/* Handles Box */}
                <motion.a
                  href="https://handles.circlefolk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card group relative bg-white/80 backdrop-blur-lg border border-[#c76c2c26] rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c76c2c]/5 to-[#e8944a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <img
                      src={dummyImage}
                      alt="Circlefolk Logo"
                      className="w-16 h-16 rounded-full object-cover mb-4 shadow-md"
                    />
                    <h3 className="font-bold text-[#c76c2c] text-xl mb-2">Check Circlefolk's Handles</h3>
                    <p className="text-[#c76c2c] opacity-70">Explore our handle system</p>
                  </div>
                </motion.a>
              </div>

              {/* Back button */}
              <motion.button
                onClick={() => setShowAlreadyOnWaitlist(false)}
                className="mt-6 text-[#c76c2c] underline hover:text-[#e8944a] transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Want enroll for the waitlist ?
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[#c76c2c] text-xs opacity-60">© 2024 Circlefolk. Connecting communities worldwide.</p>
      </div>
    </div>
  );
}