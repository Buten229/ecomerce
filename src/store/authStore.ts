import { create } from 'zustand';
import { UserProfile } from '@/types';
import { authService } from '@/services/auth.service';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserProfile>;
  register: (nombre: string, email: string, password: string, telefono?: string) => Promise<UserProfile>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  // Escuchar cambios de sesión de Supabase Auth (OAuth callback, logout, etc.)
  if (isSupabaseConfigured) {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const user = session.user;
        const isAdminEmail = user.email?.toLowerCase() === 'lorenzobuten02@gmail.com';
        const profile: UserProfile = {
          id: user.id,
          nombre: user.user_metadata?.full_name || user.user_metadata?.nombre || user.email?.split('@')[0] || 'Usuario',
          telefono: user.user_metadata?.telefono || '',
          rol: isAdminEmail ? 'admin' : 'customer',
          created_at: user.created_at,
        };
        localStorage.setItem('user_session_profile', JSON.stringify(profile));
        set({ user: profile, isAuthenticated: true, isLoading: false });
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('user_session_profile');
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    });
  }

  return {
    user: null,
    isLoading: true,
    isAuthenticated: false,

    checkSession: async () => {
      set({ isLoading: true });
      try {
        const user = await authService.getCurrentUser();
        set({ user, isAuthenticated: !!user, isLoading: false });
      } catch {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    },

    login: async (email, password) => {
      set({ isLoading: true });
      try {
        const user = await authService.login(email, password);
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    register: async (nombre, email, password, telefono) => {
      set({ isLoading: true });
      try {
        const user = await authService.register(nombre, email, password, telefono);
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    loginWithGoogle: async () => {
      await authService.loginWithGoogle();
    },

    logout: async () => {
      await authService.logout();
      localStorage.removeItem('user_session_profile');
      set({ user: null, isAuthenticated: false });
    },
  };
});
