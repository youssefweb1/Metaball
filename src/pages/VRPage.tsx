import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

// Video mapping object
const videoMap: { [key: string]: string } = {
  'hilalnassr2024': 'https://cdn.aframe.io/360-video-boilerplate/video/city.mp4',
  'ittihadahli2024': 'https://cdn.aframe.io/360-video-boilerplate/video/city.mp4',
  'shababfateh2024': 'https://cdn.aframe.io/360-video-boilerplate/video/city.mp4'
};

export default function VRPage() {
  const [accessCode, setAccessCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code && videoMap[code]) {
      setAccessCode(code);
      setIsValid(true);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoMap[accessCode]) {
      setIsValid(true);
      setError('');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  if (!isValid) {
    return (
      <div className="pt-20">
        <section className="min-h-screen bg-dark flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 max-w-md"
          >
            <div className="rounded-xl glass-effect p-8">
              <h1 className="text-3xl font-bold mb-6 gradient-text text-center">
                Enter Access Code
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full px-10 py-3 rounded-lg bg-black bg-opacity-50 border border-gray-700 text-white focus:outline-none focus:border-neon-green"
                      placeholder="Enter your access code"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-neon-green text-dark font-bold hover:bg-opacity-90 transition-all"
                >
                  Start VR Experience
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh' }}>
      {/* @ts-ignore */}
      <a-scene>
        {/* @ts-ignore */}
        <a-assets>
          <video 
            id="match-video" 
            src={videoMap[accessCode]} 
            autoPlay 
            loop 
            crossOrigin="anonymous"
          ></video>
        </a-assets>
        {/* @ts-ignore */}
        <a-videosphere src="#match-video" rotation="0 -90 0"></a-videosphere>
        {/* @ts-ignore */}
        <a-camera position="0 1.6 0"></a-camera>
      </a-scene>
      <button
        onClick={() => navigate('/demo')}
        className="fixed top-4 left-4 z-50 py-2 px-4 rounded-lg bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
      >
        Exit VR
      </button>
    </div>
  );
}