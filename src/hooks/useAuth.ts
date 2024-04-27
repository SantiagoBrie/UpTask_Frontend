import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        /// refetchOnWindowFocus: false lo que hace es deshabilitar el refetch cuando se cambia de una solapa a otra
        refetchOnWindowFocus: false
    })
    return { data, isError, isLoading }
}