import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurant";
import ManageRestaurantForm from "@/forms/restaurants-forms/ManageRestaurantForm";

const ManageRestarant = () => {
  const { isLoading: isCreateLoading, createRestaurant } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { isLoading: isUpdateLoading, updateRestaurant } =
    useUpdateMyRestaurant();

  const isEditting = !!restaurant;

  return (
    <ManageRestaurantForm
      isLoading={isCreateLoading || isUpdateLoading}
      onSave={isEditting ? updateRestaurant : createRestaurant}
      restaurant={restaurant}
    />
  );
};
export default ManageRestarant;
