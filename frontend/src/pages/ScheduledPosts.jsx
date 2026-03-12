import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { mockService } from '../services/mockService';
import { PostTable } from '../components/PostTable';

export function ScheduledPosts() {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const posts = await mockService.getScheduledPosts();
        setScheduledPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Scheduled Posts</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all your upcoming automated content.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <Calendar className="w-5 h-5 text-primary-600" />
          <span className="font-semibold text-gray-900">{scheduledPosts.length}</span>
          <span className="text-sm text-gray-500">Upcoming</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <PostTable posts={scheduledPosts} showActions={true} />
        )}
      </div>
    </div>
  );
}
