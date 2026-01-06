// API Configuration
export const API_BASE_URL = 'http://localhost:3002/api';

// Types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'model' | 'admin' | 'supervisor';
  verificationStatus: 'pending' | 'approved' | 'rejected';
  profile: {
    bio?: string;
    instagram?: string;
    x?: string;
    website?: string;
  };
  subscriptionPrice?: number;
  isSubscribed?: boolean;
  subscriberCount?: number;
}

export interface Creator {
  _id: string;
  username: string;
  profile: {
    bio?: string;
    instagram?: string;
    x?: string;
    website?: string;
  };
  verificationStatus: 'pending' | 'approved' | 'rejected';
  subscriptionPrice?: number;
  isSubscribed?: boolean;
  subscriberCount?: number;
}

export interface Subscription {
  _id: string;
  fanId: string;
  creatorId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate?: string;
  price: number;
  creator?: User;
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'video';
  fileUrl?: string;
  isRead: boolean;
  createdAt: string;
  sender?: { username: string };
  receiver?: { username: string };
}

// API Functions
export const api = {
  // Health check
  health: () => fetch(`${API_BASE_URL}/health`).then(res => res.json()),

  // Auth
  register: (userData: { username: string; email: string; password: string; role?: string }) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json()),

  login: (credentials: { email: string; password: string }) =>
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => res.json()),

  // Creators
  getCreators: (params?: { search?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetch(`${API_BASE_URL}/users/creators${query ? '?' + query : ''}`)
      .then(res => res.json());
  },

  getCreator: (creatorId: string) =>
    fetch(`${API_BASE_URL}/creators/${creatorId}`)
      .then(res => res.json()),

  // Subscriptions
  subscribe: (creatorId: string) =>
    fetch(`${API_BASE_URL}/subscriptions/subscribe/${creatorId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()),

  unsubscribe: (creatorId: string) =>
    fetch(`${API_BASE_URL}/subscriptions/unsubscribe/${creatorId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()),

  getMySubscriptions: () =>
    fetch(`${API_BASE_URL}/subscriptions/my-subscriptions`)
      .then(res => res.json()),

  // Chat (placeholder for future implementation)
  getChatHistory: (creatorId: string) =>
    fetch(`${API_BASE_URL}/chat/messages/${creatorId}`)
      .then(res => res.json()),

  sendMessage: (data: { creatorId: string; content: string; type?: string }) =>
    fetch(`${API_BASE_URL}/chat/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
};
