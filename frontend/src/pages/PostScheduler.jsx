import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Send, Globe, Zap } from 'lucide-react';
import { mockService } from '../services/mockService';
import { Button, cn } from '../components/ui/Button';

export function PostScheduler() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [scheduleType, setScheduleType] = useState('now'); // 'now' or 'later'

  const handleSchedule = async () => {
    setLoading(true);
    try {
      await mockService.schedulePost({ type: scheduleType });
      // Redirect to status page after successful scheduling
      navigate('/status');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Schedule Post</h2>
        <p className="text-sm text-gray-500 mt-1">Choose when you want to publish your content.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={cn(
              "border-2 rounded-xl p-6 cursor-pointer transition-all",
              scheduleType === 'now' ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => setScheduleType('now')}
          >
            <div className="flex flex-col items-center text-center">
              <Send className={cn("w-8 h-8 mb-3", scheduleType === 'now' ? "text-primary-600" : "text-gray-400")} />
              <h4 className="font-semibold text-gray-900">Post Now</h4>
              <p className="text-xs text-gray-500 mt-1">Publish to Instagram immediately</p>
            </div>
          </div>

          <div 
            className={cn(
              "border-2 rounded-xl p-6 cursor-pointer transition-all",
              scheduleType === 'later' ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => setScheduleType('later')}
          >
            <div className="flex flex-col items-center text-center">
              <CalendarIcon className={cn("w-8 h-8 mb-3", scheduleType === 'later' ? "text-primary-600" : "text-gray-400")} />
              <h4 className="font-semibold text-gray-900">Schedule later</h4>
              <p className="text-xs text-gray-500 mt-1">Pick a specific date and time</p>
            </div>
          </div>
        </div>

        {scheduleType === 'later' && (
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Select Date & Time</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="date" 
                    className="pl-10 block w-full rounded-lg border-gray-300 border py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="time" 
                    className="pl-10 block w-full rounded-lg border-gray-300 border py-2 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm outline-none" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
              <Zap className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-indigo-900">AI Suggested Time</p>
                <p className="text-xs text-indigo-700 mt-1">Based on your audience engagement, we recommend posting at <strong>6:30 PM (EST)</strong> today.</p>
                <button className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide">
                  Apply Suggestion
                </button>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 mt-4">
              <Globe className="w-4 h-4 mr-2" /> Timezone: America/New_York (EST)
            </div>
          </div>
        )}

        <div className="pt-6 flex justify-end gap-4 border-t border-gray-100">
          <Button variant="outline" onClick={() => navigate('/analysis')}>Back</Button>
          <Button 
            onClick={handleSchedule}
            disabled={loading}
          >
            {loading ? 'Processing...' : (scheduleType === 'now' ? 'Publish Now' : 'Schedule Post')}
          </Button>
        </div>
      </div>
    </div>
  );
}
