import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openAuthModal = () => {   {/* Login navigation */}
    setIsAuthModalOpen(true);
    navigate('/login');
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleUpgradeClick = () => {
    if (location.pathname === '/subscription') {
      navigate('/');
    } else {
      navigate('/subscription');
    }
  };

  return (
    // header of the website 
    <header className="bg-gray-500 border border-cyan-200 backdrop-brightness-150 py-2 px-4 mt-7 mx-6 rounded-full shadow-glow shadow-blue-600 backdrop-blur-lg bg-opacity-30">
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center mr-4 shadow-glow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-white flex items-center">
            DataMind
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              BETA
            </span>
          </h1>
        </motion.div>

        <div className="flex items-center space-x-5 mt-2 my-2">
          <Button size="sm" className="text-white bg-none px-2 py-1 rounded-full shadow-md hover:bg-primary-600" onClick={() => navigate('/')}>
            Home
          </Button>

          <Button size="sm" className="text-white bg-none px-1 py-1 rounded-full shadow-md hover:bg-primary-600" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>

          <Button size="sm" className="text-white px-3 py-1 my-2-1 rounded-full bg-none shadow-md hover:bg-primary-600 transition-colors duration-300 text-sm" onClick={() => navigate('/register')}>
            Register
          </Button>
        
          <Button size="sm" className="bg-none px-2 py-2 rounded-full shadow-md hover:bg-primary-600" onClick={handleUpgradeClick}>
            Upgrade
          </Button>
          {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
        </div>
      </div>
      
    </header>
  );
};

export default Header;