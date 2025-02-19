import { envConfigFrontend } from "@/config/env.confg";
import { useAuth0, User } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = envConfigFrontend.API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const useGetCurrentUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "Application/json"
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    }
    const { data: currentUser, isLoading, error, } = useQuery("fetchCurrentUser", getMyUserRequest);

    if (error) {
        toast.error(error.toString())
    }

    return {
        currentUser, isLoading,
    }
}
export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            throw new Error('Failed to create user');
        }
    }
    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);

    return {
        createUser, isLoading, isError, isSuccess
    }
}

type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            throw new Error('Failed to update user')
        }

        return response.json();
    }

    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success('User profile updated')
    }
    if (error) {
        toast.error(error.toString());
        reset()
    }

    return {
        updateUser, isLoading,
    }
}