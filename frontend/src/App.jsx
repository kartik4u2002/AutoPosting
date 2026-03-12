import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UploadPost } from './pages/UploadPost';
import { AiAnalysis } from './pages/AiAnalysis';
import { PostScheduler } from './pages/PostScheduler';
import { ScheduledPosts } from './pages/ScheduledPosts';
import { PostStatus } from './pages/PostStatus';
import { Analytics } from './pages/Analytics';
import { ContentHistory } from './pages/ContentHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPost />} />
          <Route path="/analysis" element={<AiAnalysis />} />
          <Route path="/scheduler" element={<PostScheduler />} />
          <Route path="/scheduled-posts" element={<ScheduledPosts />} />
          <Route path="/status" element={<PostStatus />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/history" element={<ContentHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
