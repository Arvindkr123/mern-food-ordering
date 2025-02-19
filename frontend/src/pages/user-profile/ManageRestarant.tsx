import { useCreateMyRestaurant } from "@/api/MyRestaurant";
import ManageRestaurantForm from "@/forms/restaurants-forms/ManageRestaurantForm";

const ManageRestarant = () => {
  const { isLoading, createRestaurant } = useCreateMyRestaurant();
  return (
    <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} />
  );
};
export default ManageRestarant;
