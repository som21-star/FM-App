import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isPremium: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    isPremium: false,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        try {
            // Clear premium status from localStorage
            if (session?.user?.id) {
                localStorage.removeItem(`premium_${session.user.id}`);
            }
            await supabase.auth.signOut();
            toast.success('Signed out successfully', {
                description: 'See you next time!'
            });
            // Redirect to home after sign out
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        } catch (error) {
            console.error('Sign out error:', error);
            toast.error('Failed to sign out', {
                description: 'Please try again'
            });
        }
    };

    // Check premium status from user_metadata OR localStorage fallback
    const isPremium = 
        session?.user?.user_metadata?.is_premium === true || 
        (session?.user?.id && localStorage.getItem(`premium_${session.user.id}`) === 'true');

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, isPremium, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
