import { useEffect } from 'react';
import {
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Mail,
  Download
} from 'lucide-react';
import dummyImage from '/dummy-dp.jpg';

const links = [
  {
    icon: <Globe size={32} />, title: 'Official Website',
    description: 'Discover the app and join the community revolution',
    href: 'https://circlefolk.com'
  },
  {
    icon: <Instagram size={32} />, title: 'Instagram',
    description: 'Community stories, updates & behind-the-scenes',
    href: 'https://instagram.com/circlefolk'
  },
  {
    icon: <Facebook size={32} />, title: 'Facebook',
    description: 'Join our growing global community network',
    href: 'https://facebook.com/circlefolkapp'
  },
  {
    icon: <Twitter size={32} />, title: 'Twitter / X',
    description: 'Latest news, announcements & community insights',
    href: 'https://x.com/circlefolkapp'
  },
  {
    icon: <Youtube size={32} />, title: 'YouTube',
    description: 'Tutorials, features & community success stories',
    href: 'https://youtube.com/@circlefolkapp'
  },
  {
    icon: <Linkedin size={32} />, title: 'LinkedIn',
    description: 'Professional updates, careers & business insights',
    href: 'https://linkedin.com/company/circlefolk'
  },
  {
    icon: <Github size={32} />, title: 'GitHub',
    description: 'Open source contributions & developer resources',
    href: 'https://github.com/circlefolkapp'
  },
  {
    icon: <Mail size={32} />, title: 'Get in Touch',
    description: 'hello@circlefolk.com - We\'d love to hear from you!',
    href: 'mailto:hello@circlefolk.com'
  }
];

export default function CirclefolkLinksPage() {
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

  const bubbles = Array.from({ length: 40 }).map((_, i) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefd8] via-[#f5e6c8] to-[#feefd8] animate-gradientShift relative overflow-hidden">
      {/* Background bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {bubbles}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center">
        <img src={dummyImage} alt="Circlefolk Logo" className="w-32 h-32 rounded-full object-cover mb-8 shadow-lg" />
        <p className="text-2xl md:text-3xl font-medium text-[#c76c2c] mb-2">Circlefolk Waitlist</p>
        <p className="text-lg text-[#c76c2c] opacity-80 max-w-xl mx-auto mb-10">
          Join the revolution of hyperlocal social networking where your neighborhood becomes your network
        </p>

        <div className="w-full max-w-md mb-12">
          <div className="bg-white/80 backdrop-blur-lg border border-[#c76c2c26] rounded-2xl p-8">
            <h3 className="font-bold text-[#c76c2c] text-xl mb-4 text-center">Get notified on app release</h3>
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl border border-[#c76c2c26] bg-white/60 text-[#c76c2c] placeholder-[#c76c2c]/50 focus:outline-none focus:ring-2 focus:ring-[#c76c2c] focus:border-transparent transition-all"
            />
            <button className="w-full mt-4 bg-gradient-to-r from-[#c76c2c] to-[#e8944a] text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>

        <p className="text-[#c76c2c] text-xs opacity-60">© 2024 Circlefolk. Connecting communities worldwide.</p>
      </div>
    </div>
  );
}

/* Tailwind animation utilities (in tailwind.config.js add):
  keyframes: {
    gradientShift: {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
    particleFloat: {
      '0%, 100%': { transform: 'translateY(0px) translateX(0px) scale(1)', opacity: '0.3' },
      '33%': { transform: 'translateY(-30px) translateX(20px) scale(1.1)', opacity: '0.6' },
      '66%': { transform: 'translateY(-60px) translateX(-10px) scale(0.9)', opacity: '0.4' },
    }
  },
  animation: {
    gradientShift: 'gradientShift 8s ease infinite',
    particleFloat: 'particleFloat 8s ease-in-out infinite',
  },
*/