import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../redux";

export default function useAddProfileForm(
  user,
  setaddFormVisibility,
  addFormVisibility
) {
  const dispatch = useDispatch();

  const handleAdd = (data) => {
    const updateUser = (image) => {
      dispatch(
        updateUserAsync({
          ...user,
          name: data.name,
          phone: data.phone,
          image: image || null,
          address: {
            ...user.address,
            place: data.place,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
          },
        })
      );
    };

    if (data.image2.length !== 0) {
      const reader = new FileReader();
      reader.onload = (e) => updateUser(e.target.value);
      reader.readAsDataURL(data.image2[0]);
    } else {
      updateUser(data.image);
    }
  };

  const submitHandle = (data) => {
    handleAdd(data);
    setaddFormVisibility(!addFormVisibility);
  };

  return { submitHandle };
}
