import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Heart, Share2, MessageCircle } from 'lucide-react';
import { mockService } from '../services/mockService';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const stats = await mockService.getAnalytics();
        setData(stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
     return (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
     );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Measure the performance of your Instagram content.</p>
        </div>
        <select className="border-gray-200 border rounded-lg text-sm bg-white px-4 py-2 focus:ring-primary-500 focus:border-primary-500 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard 
          title="Total Reach" 
          value={data?.overview.reach.toLocaleString() || '15,400'} 
          icon={Users} 
          trend="up" 
          change={8} 
        />
        <AnalyticsCard 
          title="Total Likes" 
          value={data?.overview.likes.toLocaleString() || '3,200'} 
          icon={Heart} 
          color="primary" 
          trend="up" 
          change={12} 
        />
        <AnalyticsCard 
          title="Comments" 
          value={data?.overview.comments.toLocaleString() || '410'} 
          icon={MessageCircle} 
          color="blue" 
          trend="down" 
          change={3} 
        />
        <AnalyticsCard 
          title="Shares" 
          value={data?.overview.shares.toLocaleString() || '120'} 
          icon={Share2} 
          color="green" 
          trend="up"
          change={24}
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Engagement Overview</h3>
            <p className="text-sm text-gray-500">Daily interactions across all your posts</p>
          </div>
          <BarChart3 className="text-gray-400 w-6 h-6" />
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
