import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { mockService } from '../services/mockService';
import { PostTable } from '../components/PostTable';

export function PostStatus() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Combine scheduled and recent posts to show varying statuses
        const [scheduled, recent] = await Promise.all([
          mockService.getScheduledPosts(),
          mockService.getRecentPosts()
        ]);
        
        // Mock a 'Posting' and 'Failed' post for variety
        const mockVarying = [
          { id: 201, title: "Afternoon Coffee", time: "Just now", status: "Posting", type: "image" },
          { id: 202, title: "Office Tour", time: "1 hour ago", status: "Failed", type: "video" },
        ];

        setPosts([...mockVarying, ...scheduled, ...recent]);
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Post Status</h2>
          <p className="text-sm text-gray-500 mt-1">Live tracking of your content pipeline.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
          <Activity className="w-4 h-4" />
          <span className="text-sm font-medium">All systems operational</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <PostTable posts={posts} showActions={true} />
        )}
      </div>
    </div>
  );
}
