import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../services/mockService';
import { Button } from '../components/ui/Button';
import { Sparkles, Hash, Edit3, ArrowRight, RefreshCw, Wand2 } from 'lucide-react';

export function AiAnalysis() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const data = await mockService.analyzeMedia();
        setAnalysis(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20 space-y-6 text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-100 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-10 h-10 text-primary-500 animate-bounce" />
          </div>
          <div className="absolute top-0 right-0 -tr-2 -tr-mt-2 border-4 border-white border-t-primary-500 rounded-full w-20 h-20 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI is analyzing your media...</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-sm">Detecting scenes, extracting topics, and generating the perfect caption and hashtags.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative pb-20">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">AI Analysis Results</h2>
        <p className="text-sm text-gray-500 mt-1">Review and refine the AI-generated content for your post.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary-600" /> Caption
              </h3>
              <Button variant="ghost" size="sm" className="text-primary-600">
                <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
              </Button>
            </div>
            <textarea 
              className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none text-gray-700 leading-relaxed"
              defaultValue={analysis?.suggestedCaption}
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary-600" /> Hashtags
              </h3>
              <Button variant="ghost" size="sm" className="text-primary-600">
                <Wand2 className="w-4 h-4 mr-2" /> Discover More
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {analysis?.suggestedHashtags?.map((tag, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-primary-50 hover:text-primary-700 cursor-pointer transition-colors border border-transparent hover:border-primary-200">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <input 
                type="text" 
                placeholder="Add custom hashtags... (comma separated)" 
                className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 text-white">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary-400" /> Detection Output
            </h3>
            
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-700">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Topic</p>
                <p className="font-medium">{analysis?.topic}</p>
              </div>
              <div className="pb-4 border-b border-gray-700">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Mood</p>
                <p className="font-medium text-emerald-400">{analysis?.mood}</p>
              </div>
              <div className="pb-4 border-b border-gray-700">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Audience</p>
                <p className="font-medium text-blue-300">{analysis?.audience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Classification</p>
                <span className="inline-flex bg-white/20 px-2 py-1 rounded text-xs mt-1">
                  {analysis?.classification}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-end gap-4 z-10 px-6 lg:px-8">
        <Button variant="outline" onClick={() => navigate('/upload')}>Back</Button>
        <Button onClick={() => navigate('/scheduler')}>
          Continue to Schedule <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
