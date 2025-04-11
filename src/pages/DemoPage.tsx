import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Video, Copy, Check } from 'lucide-react';

interface Match {
  id: string;
  title: string;
  image: string;
  accessCode: string;
  videoUrl: string;
}

const matches: Match[] = [
  {
    id: 'match1',
    title: 'Al Hilal vs Al Nassr',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    accessCode: 'hilalnassr2024',
    videoUrl: '/videos/vr-video.mp4'  // Updated to local video path
  },
  {
    id: 'match2',
    title: 'Al Ittihad vs Al Ahli',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    accessCode: 'ittihadahli2024',
    videoUrl: '/videos/vr-video.mp4'  // Updated to local video path
  },
  {
    id: 'match3',
    title: 'Al Ittihad vs Al Nassr',
    image: 'https://www.okaz.com.sa/uploads/images/2022/02/11/1935100.jpg',
    accessCode: 'shababfateh2024',
    videoUrl: '/videos/vr-video.mp4'  // Updated to local video path
  }
];

export default function DemoPage() {
  const navigate = useNavigate();
  const [showCode, setShowCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Update the handleWatchVR function
  const handleWatchVR = (matchId: string, accessCode: string, videoUrl: string) => {
    navigate(`/vr?match=${matchId}&code=${accessCode}&video=${encodeURIComponent(videoUrl)}`);
  };

  return (
    <div className="pt-20">
      <section className="min-h-screen bg-dark">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Available Matches
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience Saudi Pro League matches in immersive VR
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-xl glass-effect overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={match.image} 
                    alt={match.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{match.title}</h3>
                  <div className="space-y-3">
                    <div className="space-y-3">
                      <div
                        onClick={() => setShowCode(showCode === match.id ? null : match.id)}
                        className="w-full py-2 px-4 rounded-lg bg-black bg-opacity-50 border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Lock size={18} />
                        <span>{showCode === match.id ? match.accessCode : 'Get Access Code'}</span>
                        {showCode === match.id && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyCode(match.accessCode);
                            }}
                            className="ml-2 hover:text-white transition-colors cursor-pointer"
                          >
                            {copied === match.accessCode ? (
                              <Check size={18} />
                            ) : (
                              <Copy size={18} />
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleWatchVR(match.id, match.accessCode, match.videoUrl)}
                        className="w-full py-2 px-4 rounded-lg bg-neon-green text-dark hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
                      >
                        <Video size={18} />
                        <span>Watch in VR</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}