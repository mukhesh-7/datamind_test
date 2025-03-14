import { create } from 'zustand';
import { User, Document, ChatMessage, AIModel } from '../types';

interface AppState {
  user: User | null;
  documents: Document[];
  currentDocument: Document | null;
  chatMessages: ChatMessage[];
  availableModels: AIModel[];
  selectedModel: AIModel | null;
  theme: 'light' | 'dark';
  isProcessing: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  addDocument: (document: Document) => void;
  removeDocument: (documentId: string) => void;
  setCurrentDocument: (document: Document | null) => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;
  setSelectedModel: (model: AIModel | null) => void;
  toggleTheme: () => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

// Mock data for initial state
const mockModels: AIModel[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    capabilities: ['summarization', 'chat', 'grammar'],
    description: 'Advanced language model with strong capabilities across all tasks.'
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    capabilities: ['summarization', 'chat'],
    description: 'Excellent for nuanced understanding and detailed responses.'
  },
  // {
  //   id: '3',
  //   name: 'Command R+',
  //   provider: 'Cohere',
  //   capabilities: ['summarization', 'chat'],
  //   description: 'Specialized in document understanding and retrieval.'
  // }
];

// Default user
const defaultUser: User = {
  id: 'default',
  name: 'User',
  email: 'datamind@gmail.com',
  preferences: {
    theme: 'light',
    fontSize: 'medium'
  }
};

export const useStore = create<AppState>((set) => ({
  user: defaultUser,
  documents: [],
  currentDocument: null,
  chatMessages: [],
  availableModels: mockModels,
  selectedModel: mockModels[0],
  theme: 'dark', // Default to dark theme
  isProcessing: false,
  
  setUser: (user) => set({ user }),
  
  addDocument: (document) => set((state) => {
    // Simulate processing
    set({ isProcessing: true });
    
    // After 1.5 seconds, set isProcessing to false
    setTimeout(() => {
      set({ isProcessing: false });
    }, 1500);
    
    return { 
      documents: [...state.documents, document],
      currentDocument: document // Automatically select the new document
    };
  }),
  
  removeDocument: (documentId) => set((state) => ({ 
    documents: state.documents.filter(doc => doc.id !== documentId),
    currentDocument: state.currentDocument?.id === documentId ? null : state.currentDocument
  })),
  
  setCurrentDocument: (document) => set({ currentDocument: document }),
  
  addChatMessage: (message) => set((state) => ({ 
    chatMessages: [...state.chatMessages, message] 
  })),
  
  clearChatMessages: () => set({ chatMessages: [] }),
  
  setSelectedModel: (model) => set({ selectedModel: model }),
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  setIsProcessing: (isProcessing) => set({ isProcessing })
}));