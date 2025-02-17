import { envConfigFrontend } from "@/config/env.confg"
import { Auth0Provider } from "@auth0/auth0-react"
import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    children: ReactNode
}
const Auth0ProvidersNavigate = ({ children }: Props) => {
    const domain = envConfigFrontend.AUTH0_DOMAIN;
    const clientId = envConfigFrontend.AUTH0_CLIENT_ID;
    const redirectUri = envConfigFrontend.AUTH0_CALLBACK_URL;
    const audience = envConfigFrontend.VITE_AUTH0_AUDIENCE;
    const navigate = useNavigate();
  


    if (!domain || !clientId || !redirectUri) {
        throw new Error('unable to initialise auth')
    }

    const onRedirectCallback = () => {
        navigate("/auth-callback");
    }

    return <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
        redirect_uri: redirectUri,
        audience
    }} onRedirectCallback={onRedirectCallback}>{children}</Auth0Provider>

}

export default Auth0ProvidersNavigate