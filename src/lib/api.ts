// DEMO DATA - Sin backend (solo para MVP)
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
  id: string;
  username: string;
  name: string;
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
  tags?: string[];
  followers?: number;
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

// DEMO CREATORS DATA
const DEMO_CREATORS: Creator[] = [
  {
    _id: 'c1',
    id: 'c1',
    username: 'luna_noir',
    name: 'Luna Noir',
    profile: {
      bio: 'Fotografía gótica minimalista',
      instagram: 'https://instagram.com/luna_noir',
      x: 'https://x.com/luna_noir',
      website: 'https://lunanoir.com'
    },
    verificationStatus: 'approved',
    subscriptionPrice: 5,
    isSubscribed: false,
    subscriberCount: 1200,
    tags: ['gótico', 'minimal', 'foto'],
    followers: 1200
  },
  {
    _id: 'c2',
    id: 'c2',
    username: 'vesper_aurea',
    name: 'Vesper Aurea',
    profile: {
      bio: 'Arte digital barroco y edición de video',
      instagram: 'https://instagram.com/vesper_aurea',
      x: 'https://x.com/vesper_aurea',
      website: 'https://vesperaurea.com'
    },
    verificationStatus: 'approved',
    subscriptionPrice: 5,
    isSubscribed: false,
    subscriberCount: 890,
    tags: ['barroco', 'video', 'arte'],
    followers: 890
  },
  {
    _id: 'c3',
    id: 'c3',
    username: 'morgana_velvet',
    name: 'Morgana Velvet',
    profile: {
      bio: 'Fotografía fashion editorial noir',
      instagram: 'https://instagram.com/morgana_velvet',
      x: 'https://x.com/morgana_velvet',
      website: 'https://morganavelvet.com'
    },
    verificationStatus: 'approved',
    subscriptionPrice: 5,
    isSubscribed: false,
    subscriberCount: 2100,
    tags: ['fashion', 'noir', 'editorial'],
    followers: 2100
  }
];

// API Functions - DEMO (sin backend real)
export const api = {
  // Health check
  health: () => Promise.resolve({ ok: true }),

  // Auth (demo)
  register: (userData: { username: string; email: string; password: string; role?: string }) =>
    Promise.resolve({
      success: true,
      error: undefined as string | undefined,
      token: 'demo-token',
      user: {
        _id: 'u_' + Date.now(),
        username: userData.username,
        email: userData.email,
        role: (userData.role as User['role']) || 'user',
        verificationStatus: 'pending' as const,
        profile: {},
      } as User,
    }),

  login: (credentials: { email: string; password: string }) =>
    Promise.resolve({
      success: true,
      error: undefined as string | undefined,
      token: 'demo-token',
      user: {
        _id: 'u_demo',
        username: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'user' as const,
        verificationStatus: 'pending' as const,
        profile: {},
      } as User,
    }),

  // Creators - DEMO DATA
  getCreators: (params?: { search?: string; page?: number; limit?: number }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...DEMO_CREATORS];
        
        if (params?.search) {
          const search = params.search.toLowerCase();
          results = results.filter(c =>
            c.name.toLowerCase().includes(search) ||
            c.tags?.some(t => t.toLowerCase().includes(search))
          );
        }

        resolve({ data: results, total: results.length });
      }, 300);
    });
  },

  getCreator: (creatorId: string) =>
    Promise.resolve(DEMO_CREATORS.find(c => c.id === creatorId) || null),

  // Subscriptions (demo)
  subscribe: (_creatorId: string) =>
    Promise.resolve({ success: true, message: 'Suscripción realizada' }),

  unsubscribe: (_creatorId: string) =>
    Promise.resolve({ success: true, message: 'Suscripción cancelada' }),

  getMySubscriptions: () =>
    Promise.resolve({ data: [] as Subscription[] }),

  // Chat (demo)
  getChatHistory: (_creatorId: string) =>
    Promise.resolve({ data: [] }),

  sendMessage: (_data: { creatorId: string; content: string; type?: string }) =>
    Promise.resolve({ success: true, message: 'Mensaje enviado' })
};
