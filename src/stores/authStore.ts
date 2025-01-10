import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import router from '@/router';


export const useAuthStore = defineStore('authStore', () => {
    const currentUser = ref<User | null>(null)

    const fetchUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        currentUser.value = session?.user || null;
    }

    const signOut = async () => {
        await supabase.auth.signOut();
        currentUser.value = null;
        router.push({ name: 'login' });
    }

    return {
        currentUser,
        fetchUser,
        signOut,
    }
})
