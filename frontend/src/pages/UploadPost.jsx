import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { UploadDropzone } from '../components/UploadDropzone';
import { Button } from '../components/ui/Button';

export function UploadPost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleNext = () => {
    if (file) {
      navigate('/analysis');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Upload Media</h2>
        <p className="text-sm text-gray-500 mt-1">Upload your photo or video to be analyzed by our AI.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <UploadDropzone onFileAccept={(f) => setFile(f)} />

        <div className="mt-8 flex justify-between items-center bg-primary-50 p-4 rounded-xl border border-primary-100">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">AI Magic Awaits</h4>
              <p className="text-sm text-gray-600 mt-1 max-w-sm">
                Next, our AI will automatically suggest captivating captions and optimal hashtags based on your media.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleNext} 
            disabled={!file}
            className="flex-shrink-0"
          >
            Analyze Media <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
