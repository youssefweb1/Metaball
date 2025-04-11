import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import 'aframe';

// Update the video mapping with the correct Vimeo URL format
const videoMap: { [key: string]: string } = {
  'hilalnassr2024': '/videos/vr-video.mp4',
  'ittihadahli2024': '/videos/vr-video.mp4',
  'shababfateh2024': '/videos/vr-video.mp4'
};

   
declare global {
   
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        embedded?: boolean;
        'vr-mode-ui'?: string;
      };
      'a-assets': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        timeout?: string | number;
      };
      'a-videosphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        rotation?: string;
      };
      'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: string;
        'look-controls'?: string;
        'wasd-controls'?: string;
      };
      'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}



export default function VRPage() {
  const [accessCode, setAccessCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    if (code && videoMap[code]) {
      setAccessCode('');
      setVideoUrl(videoMap[code]); // Use the video path from videoMap
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const params = new URLSearchParams(location.search);
      const expectedCode = params.get('code');
      
      if (accessCode.toLowerCase() === expectedCode?.toLowerCase()) {
        setIsValid(true);
        setError('');
      } else {
        setError('Invalid access code. Please try again.');
      }
    } catch {  // Removed the unused _error parameter
      setError('Failed to validate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoError = () => {
    setError('Failed to load video. Please try again later.');
    setIsValid(false);
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
                      disabled={isLoading}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-neon-green text-dark font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    'Start VR Experience'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', zIndex: '99999999', width: '100vw', margin: 0, padding: 0, overflow: 'hidden', position: 'fixed', top: 0, left: 0, backgroundColor: 'black' }}>
      <a-scene embedded vr-mode-ui="enabled: true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <a-assets timeout="60000">
          <video 
            id="match-video" 
            src={videoUrl}
            preload="metadata"
            loop={true}
            muted={true}
            playsInline={true}
            onError={(e) => {
              console.error('Video error:', e);
              handleVideoError();
            }}
          ></video>
        </a-assets>
        <a-videosphere 
          src="#match-video" 
          rotation="0 -90 0"
        ></a-videosphere>
        <a-camera 
          position="0 1.6 0" 
          look-controls="enabled: true"
          wasd-controls="enabled: true"
        ></a-camera>
      </a-scene>
      <div className="fixed top-4 left-4 z-[9999] flex gap-4">
        <div
          onClick={() => {
            const video = document.getElementById('match-video') as HTMLVideoElement;
            if (video) {
              video.play().catch(error => {
                console.error('Error playing video:', error);
                setError('Failed to play video. Please try again.');
              });
            }
          }}
          className="py-2 px-4 rounded-lg bg-[#00FF94] text-black font-semibold hover:bg-opacity-90 transition-all cursor-pointer"
        >
          Play Video
        </div>
        <div
          onClick={() => navigate('/demo')}
          className="py-2 px-4 rounded-lg bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all cursor-pointer"
        >
          Exit VR
        </div>
      </div>
    </div>
  );
}