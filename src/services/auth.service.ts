import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { UserProfile } from '@/types';

export const ADMIN_EMAIL = 'lorenzobuten02@gmail.com';

// Limpiar cualquier sesión mock antigua del localStorage
function clearLegacyMockSession() {
  const stored = localStorage.getItem('user_session_profile');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Si el id empieza con "user-" es una sesión mock antigua — borrarla
      if (parsed?.id && (parsed.id.startsWith('user-') || parsed.id.startsWith('google-'))) {
        localStorage.removeItem('user_session_profile');
      }
    } catch {
      localStorage.removeItem('user_session_profile');
    }
  }
}

export const authService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    // Siempre limpiar sesiones mock legacy al revisar sesión
    clearLegacyMockSession();

    if (isSupabaseConfigured) {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session || !session.user) {
          localStorage.removeItem('user_session_profile');
          return null;
        }

        const user = session.user;
        const isAdminEmail = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        const finalProfile: UserProfile = {
          id: user.id,
          nombre: profile?.nombre || user.user_metadata?.full_name || user.user_metadata?.nombre || user.email?.split('@')[0] || 'Usuario',
          telefono: profile?.telefono || '',
          rol: isAdminEmail ? 'admin' : (profile?.rol || 'customer'),
          created_at: user.created_at,
        };

        return finalProfile;
      } catch (e) {
        console.warn('Error verificando sesión de Supabase:', e);
        return null;
      }
    }

    // Sin Supabase: solo devolver sesión si fue guardada explícitamente (no mock)
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
        if (
          error.message.includes('Invalid login credentials') ||
          error.message.includes('invalid_credentials')
        ) {
          throw new Error('Correo o contraseña incorrectos. Si no tienes cuenta, regístrate en "Crear Cuenta".');
        }
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.');
        }
        throw new Error(error.message);
      }

      if (!data.user) throw new Error('No se pudo verificar la cuenta.');

      const userProfile: UserProfile = {
        id: data.user.id,
        nombre: data.user.user_metadata?.nombre || data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
        telefono: data.user.user_metadata?.telefono || '',
        rol: isAdminEmail ? 'admin' : 'customer',
        created_at: data.user.created_at,
      };

      return userProfile;
    }

    // Sin Supabase: verificar cuentas registradas manualmente
    const registeredUsersStr = localStorage.getItem('registered_demo_accounts');
    const registeredUsers: Record<string, { pass: string; profile: UserProfile }> =
      registeredUsersStr ? JSON.parse(registeredUsersStr) : {};

    const existingAccount = registeredUsers[cleanEmail];
    if (!existingAccount || existingAccount.pass !== password) {
      throw new Error('Correo o contraseña incorrectos. Si no tienes cuenta, regístrate en "Crear Cuenta".');
    }

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
        id: data.user?.id || `real-${Date.now()}`,
        nombre,
        telefono: telefono || '',
        rol: isAdminEmail ? 'admin' : 'customer',
        created_at: new Date().toISOString(),
      };

      return newUserProfile;
    }

    // Sin Supabase: guardar cuenta demo
    const registeredUsersStr = localStorage.getItem('registered_demo_accounts');
    const registeredUsers = registeredUsersStr ? JSON.parse(registeredUsersStr) : {};

    if (registeredUsers[cleanEmail]) {
      throw new Error('Este correo electrónico ya está registrado. Intenta iniciar sesión.');
    }

    const newUser: UserProfile = {
      id: `real-${Date.now()}`,
      nombre,
      telefono: telefono || '',
      rol: isAdminEmail ? 'admin' : 'customer',
      created_at: new Date().toISOString(),
    };

    registeredUsers[cleanEmail] = { pass: password, profile: newUser };
    localStorage.setItem('registered_demo_accounts', JSON.stringify(registeredUsers));
    return newUser;
  },

  async loginWithGoogle(): Promise<void> {
    if (!isSupabaseConfigured) {
      throw new Error('Configura las credenciales de Supabase para usar Google.');
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
    localStorage.removeItem('registered_demo_accounts');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  },
};
