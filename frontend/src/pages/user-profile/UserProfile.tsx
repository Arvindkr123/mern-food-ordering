import { useUpdateMyUser } from '@/api/MyUserApi'
import UserProfileForm from '@/forms/user-forms/user.profile.forms'

const UserProfile = () => {

    const { updateUser, isLoading } = useUpdateMyUser();

    return (
        <UserProfileForm onSave={updateUser} isLoading={isLoading} />
    )
}

export default UserProfile