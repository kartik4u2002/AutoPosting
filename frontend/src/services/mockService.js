// mockService.js

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockService = {
  // Auth
  login: async () => {
    await delay(1000);
    return { token: "mock_token", user: { name: "Demo User", handle: "@demo_user" } };
  },

  // Dashboard Summary
  getDashboardStats: async () => {
    await delay(500);
    return {
      scheduled: 12,
      published: 45,
      engagement: 8400,
      upcoming: 3
    };
  },

  // Posts
  getScheduledPosts: async () => {
    await delay(600);
    return [
      { id: 1, type: "image", title: "Sunset at the beach", time: "Tomorrow 5:00 PM", status: "Scheduled" },
      { id: 2, type: "video", title: "Gym workout reel", time: "Friday 9:00 AM", status: "Scheduled" },
      { id: 3, type: "image", title: "New product launch", time: "Next Monday 12:00 PM", status: "Draft" },
    ];
  },

  getRecentPosts: async () => {
    await delay(600);
    return [
      { id: 101, title: "Breakfast Bowl", date: "Yesterday", likes: 340, comments: 24, status: "Posted" },
      { id: 102, title: "Morning Run", date: "3 Days Ago", likes: 512, comments: 18, status: "Posted" }
    ];
  },

  // AI Analysis & Generation
  analyzeMedia: async (file) => {
    await delay(2000); // simulate heavier task
    return {
      topic: "Travel & Lifestyle",
      mood: "Relaxing, Inspiring",
      audience: "Travel lovers, Wanderers",
      classification: "Aesthetic Landscape",
      suggestedCaption: "Finding peace in every sunset. 🌅 Nature never fails to amaze me.",
      suggestedHashtags: ["#travel", "#sunsetvibes", "#explorepage", "#wanderlust", "#naturelovers"]
    };
  },

  // Scheduling
  schedulePost: async (postData) => {
    await delay(1000);
    console.log("Post scheduled:", postData);
    return { success: true, message: "Post successfully scheduled!" };
  },
  
  // Analytics
  getAnalytics: async () => {
    await delay(800);
    return {
      overview: { reach: 15400, likes: 3200, comments: 410, shares: 120 },
      chartData: [
        { name: 'Mon', engagement: 400 },
        { name: 'Tue', engagement: 300 },
        { name: 'Wed', engagement: 550 },
        { name: 'Thu', engagement: 450 },
        { name: 'Fri', engagement: 700 },
        { name: 'Sat', engagement: 900 },
        { name: 'Sun', engagement: 850 },
      ]
    };
  }
};
