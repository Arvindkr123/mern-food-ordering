import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurant";
import ManageRestaurantForm from "@/forms/restaurants-forms/ManageRestaurantForm";

const ManageRestarant = () => {
  const { isLoading, createRestaurant } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm
      isLoading={isLoading}
      onSave={createRestaurant}
      restaurant={restaurant}
    />
  );
};
export default ManageRestarant;
