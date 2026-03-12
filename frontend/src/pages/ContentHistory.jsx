import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import { mockService } from '../services/mockService';
import { PostTable } from '../components/PostTable';

export function ContentHistory() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const _posts = await mockService.getRecentPosts();
        
        // Add some more mock history for visual filler
        const extendedHistory = [
          ..._posts,
          { id: 301, title: "Summer Vibes", date: "Last Week", likes: 890, comments: 45, status: "Posted", type: "video" },
          { id: 302, title: "Q&A Session", date: "2 Weeks Ago", likes: 1200, comments: 130, status: "Posted", type: "image" },
          { id: 303, title: "Behind the Scenes", date: "Last Month", likes: 2100, comments: 85, status: "Posted", type: "video" },
        ];
        
        setPosts(extendedHistory);
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Content History</h2>
          <p className="text-sm text-gray-500 mt-1">Review your previously published content.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
          <History className="w-4 h-4" />
          <span className="text-sm font-medium">{posts.length} Posts Archive</span>
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
