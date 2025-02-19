import { useGetCurrentUser, useUpdateMyUser } from '@/api/MyUserApi'
import UserProfileForm from '@/forms/user-forms/user.profile.forms'

const UserProfile = () => {
    const { currentUser, isLoading: getUserLoading } = useGetCurrentUser();
    const { updateUser, isLoading: updateUserLoading } = useUpdateMyUser();

    if (getUserLoading) {
        return <span>Loading....</span>
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>
    }


    return (
        <UserProfileForm onSave={updateUser} isLoading={updateUserLoading}  currentUser={currentUser}/>
    )
}

export default UserProfile