import { privateAxios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const fetchCurrentUser = async () => {
    const { data } = await privateAxios.get('/user/me');
    return data.user; 
};

export const useUser = () => {
    return useQuery({
        queryKey: ['currentUser'], 
        queryFn: fetchCurrentUser,
        staleTime: 5 * 60 * 1000,
        
        gcTime: 10 * 60 * 1000,

        refetchOnWindowFocus: false,

        refetchOnReconnect: false,

        refetchOnMount: false,
    });
};