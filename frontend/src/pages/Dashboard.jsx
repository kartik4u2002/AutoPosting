import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import { mockService } from '../services/mockService';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { PostTable } from '../components/PostTable';

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, postsData] = await Promise.all([
          mockService.getDashboardStats(),
          mockService.getRecentPosts()
        ]);
        setStats(statsData);
        setRecentPosts(postsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex space-x-2 justify-center items-center h-64">
        <span className="sr-only">Loading...</span>
        <div className="h-4 w-4 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-primary-600 rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of your Instagram automation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Scheduled Posts" 
          value={stats?.scheduled || 0} 
          icon={Calendar} 
          trend="up" 
          change={12} 
        />
        <AnalyticsCard 
          title="Published Posts" 
          value={stats?.published || 0} 
          icon={CheckCircle} 
          color="green" 
          trend="up" 
          change={2} 
        />
        <AnalyticsCard 
          title="Avg Engagement" 
          value={(stats?.engagement || 0).toLocaleString()} 
          icon={TrendingUp} 
          color="blue" 
          trend="up" 
          change={18} 
        />
        <AnalyticsCard 
          title="Upcoming Today" 
          value={stats?.upcoming || 0} 
          icon={Clock} 
          color="yellow" 
        />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Recent Activity</h3>
        </div>
        <div className="bg-white rounded-xl">
          <PostTable posts={recentPosts} />
        </div>
      </div>
    </div>
  );
}
