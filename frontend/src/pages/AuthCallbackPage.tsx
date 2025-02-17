import { useCreateMyUser } from '@/api/MyUserApi';
import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { createUser } = useCreateMyUser();

    const hasCreatedUser = useRef(false)

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({ auth0Id: user?.sub, email: user?.email })
            hasCreatedUser.current = true;
        }
        navigate("/")
    }, [createUser, user, navigate])
    return (
        <div>Loading...</div>
    )
}

export default AuthCallbackPage