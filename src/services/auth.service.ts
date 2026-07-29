import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { UserProfile } from '@/types';

export const ADMIN_EMAIL = 'lorenzobuten02@gmail.com';

export const authService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    if (isSupabaseConfigured) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) {
          localStorage.removeItem('user_session_profile');
          return null;
        }

        const user = session.user;
        const isAdminEmail = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();

        const finalProfile: UserProfile = {
          id: user.id,
          nombre: profile?.nombre || user.user_metadata?.full_name || user.user_metadata?.nombre || user.email?.split('@')[0] || 'Usuario',
          telefono: profile?.telefono || user.user_metadata?.telefono || '',
          rol: isAdminEmail ? 'admin' : (profile?.rol || 'customer'),
          created_at: user.created_at,
        };

        localStorage.setItem('user_session_profile', JSON.stringify(finalProfile));
        return finalProfile;
      } catch (e) {
        console.warn('Error obteniendo sesión de Supabase:', e);
      }
    }

    const stored = localStorage.getItem('user_session_profile');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.removeItem('user_session_profile');
      }
    }

    return null;
  },

  async login(email: string, password: string): Promise<UserProfile> {
    const cleanEmail = email.toLowerCase().trim();
    const isAdminEmail = cleanEmail === ADMIN_EMAIL.toLowerCase();

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Correo o contraseña incorrectos. Si no tienes cuenta, haz clic en "Crear Cuenta".');
        }
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('No se pudo verificar la cuenta.');
      }

      const userProfile: UserProfile = {
        id: data.user.id,
        nombre: data.user.user_metadata?.nombre || data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
        telefono: data.user.user_metadata?.telefono || '',
        rol: isAdminEmail ? 'admin' : 'customer',
        created_at: data.user.created_at,
      };

      localStorage.setItem('user_session_profile', JSON.stringify(userProfile));
      return userProfile;
    }

    // Modo sin Supabase: Solo permite iniciar sesión si la cuenta fue registrada antes
    const registeredUsersStr = localStorage.getItem('registered_demo_accounts');
    const registeredUsers: Record<string, { pass: string; profile: UserProfile }> = registeredUsersStr
      ? JSON.parse(registeredUsersStr)
      : {};

    const existingAccount = registeredUsers[cleanEmail];

    if (!existingAccount || existingAccount.pass !== password) {
      throw new Error('Correo o contraseña incorrectos. Si no tienes cuenta, por favor regístrate primero en "Crear Cuenta".');
    }

    localStorage.setItem('user_session_profile', JSON.stringify(existingAccount.profile));
    return existingAccount.profile;
  },

  async register(nombre: string, email: string, password: string, telefono?: string): Promise<UserProfile> {
    const cleanEmail = email.toLowerCase().trim();
    const isAdminEmail = cleanEmail === ADMIN_EMAIL.toLowerCase();

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { nombre, telefono, rol: isAdminEmail ? 'admin' : 'customer' },
        },
      });

      if (error) throw new Error(error.message);

      const newUserProfile: UserProfile = {
        id: data.user?.id || `user-${Date.now()}`,
        nombre,
        telefono: telefono || '',
        rol: isAdminEmail ? 'admin' : 'customer',
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('user_session_profile', JSON.stringify(newUserProfile));
      return newUserProfile;
    }

    // Guardar en demo registrado
    const registeredUsersStr = localStorage.getItem('registered_demo_accounts');
    const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : {};

    if (registeredUsers[cleanEmail]) {
      throw new Error('Este correo electrónico ya se encuentra registrado.');
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      nombre,
      telefono: telefono || '',
      rol: isAdminEmail ? 'admin' : 'customer',
      created_at: new Date().toISOString(),
    };

    registeredUsers[cleanEmail] = { pass: password, profile: newUser };
    localStorage.setItem('registered_demo_accounts', JSON.stringify(registeredUsers));
    localStorage.setItem('user_session_profile', JSON.stringify(newUser));

    return newUser;
  },

  async loginWithGoogle(): Promise<void> {
    if (!isSupabaseConfigured) {
      throw new Error('Para usar Google Auth debes guardar las credenciales en Supabase.');
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/profile`,
      },
    });

    if (error) throw new Error(error.message);
  },

  async logout(): Promise<void> {
    localStorage.removeItem('user_session_profile');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  },

  async resetPassword(email: string): Promise<void> {
    if (isSupabaseConfigured) {
      await supabase.auth.resetPasswordForEmail(email);
    }
  },
};
