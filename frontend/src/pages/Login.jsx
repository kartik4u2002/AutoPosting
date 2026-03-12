import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Instagram, ArrowRight } from 'lucide-react';
import { mockService } from '../services/mockService';
import { Button } from '../components/ui/Button';

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await mockService.login();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-primary-100 rounded-xl">
            <Sparkles className="w-10 h-10 text-primary-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          InstaAuto
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          The ultimate AI automation tool for Instagram creators
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
                Connect your Instagram account to start generating AI captions, finding viral hashtags, and automating your posting schedule.
              </p>
              
              <Button
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <>
                    <Instagram className="w-5 h-5" />
                    Continue with Instagram
                  </>
                )}
              </Button>
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or explore as guest
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate('/dashboard')}
            >
              Skip for now <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
