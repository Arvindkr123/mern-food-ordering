import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "../ui/button"
import UserMenuName from "../user-menu/UserMenuName";

const MainNav = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <>
            <span>
                {
                    isAuthenticated ? <UserMenuName /> : <Button onClick={async () => await loginWithRedirect()} variant={'ghost'} className="font-bold hover:text-orange-500 hover:bg-white">Login</Button>
                }
            </span>

        </>
    )
}

export default MainNav