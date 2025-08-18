import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "../../components";
import Loader from "../../components/common/Loader";
import { EditUserProfile } from "../../components/user/user-profile/EditUserProfile";
import { UserProfileAddressCard } from "../../components/user/user-profile/UserProfileAddressCard";
import { selectLoggedInUser, updateUserAsync } from "../../redux";
import { AddAddressForm } from "../../components/user/user-profile/AddAddressForm";

function UserProfilePage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm();

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setValue: setValue3,
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const [visibilityIndex, setVisibilityIndex] = useState(null);
  const [addFormVisibility, setaddFormVisibility] = useState(false);
  const [editProfileVisibility, setEditProfileVisibility] = useState(false);

  const handleDelete = (index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEdit = (data, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, data);
    dispatch(updateUserAsync(newUser));
  };

  const handleOpenForm = (index) => {
    setVisibilityIndex(index);
    setValue2("name", user.addresses[index].name);
    setValue2("email", user.addresses[index].email);
    setValue2("country", user.addresses[index].country);
    setValue2("street", user.addresses[index].street);
    setValue2("city", user.addresses[index].city);
    setValue2("state", user.addresses[index].state);
    setValue2("pincode", user.addresses[index].pincode);
    setValue2("phone", user.addresses[index].phone);
  };

  const handleAdd = (data) => {
    dispatch(
      updateUserAsync({ ...user, addresses: [...user.addresses, data] })
    );
  };

  const handleEditProfile = (data) => {
    if (data.image2?.length !== 0) {
      const reader = new FileReader();
      reader.readAsDataURL(data.image2[0]);
      reader.onload = (e) =>
        dispatch(
          updateUserAsync({
            ...user,
            name: data.name,
            image: data.image || e.target.result,
          })
        );
    } else {
      dispatch(
        updateUserAsync({ ...user, name: data.name, image: data.image || null })
      );
    }
  };

  if (!user)
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );

  return (
    <section>
      <BackButton />
      <div className="flex flex-col bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 max-w-7xl px-6 py-8 sm:px-6 lg:px-8 mb-6">
        <EditUserProfile
          handleSubmit3={handleSubmit3}
          handleEditProfile={handleEditProfile}
          setEditProfileVisibility={setEditProfileVisibility}
          editProfileVisibility={editProfileVisibility}
          register3={register3}
          user={user}
        />

        {!editProfileVisibility && (
          <div className="flex flex-col items-center">
            <img src="/images/profile-bg.png" className="h-[200px] lg:h-full" />
            <div className="-translate-y-30 flex flex-col items-center gap-2">
              <img
                src={user.image || "/images/profile-icon.png"}
                alt={user.name}
                className="w-30 h-30 rounded-full shadow-md"
              />
              {user.name && <span className="font-medium dark:text-white">{user.name}</span>}
              <span className="text-gray-500 text-sm font-medium dark:text-gray-400">
                {user.email}
              </span>
              <span
                onClick={() => {
                  setValue3("recovery_email", user.recovery_email);
                  setEditProfileVisibility(!editProfileVisibility);
                }}
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400/80    cursor-pointer flex  items-center underline"
              >
                <PencilIcon className="h-3 w-3 inline" />
                Edit
              </span>
            </div>

            <div className={`w-full p-5 rounded-md -translate-y-14 ${user.addresses?.length === 0?"bg-gray-50 dark:bg-gray-800":""}`}>
              <p
                className={`text-gray-900 dark:text-gray-300 font-bold text-lg flex ${user.addresses?.length === 0 ? "justify-center" : "justify-between"}`}
              >
                <span className={user.addresses?.length === 0 ? "hidden":""}>
                  Your Addresses:
                </span>

                <button
                  onClick={() => {
                    setValue("email", user.email);
                    setaddFormVisibility(!addFormVisibility);
                  }}
                  className={
                    "rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-customBlue " +
                    (addFormVisibility ? "hidden mt-6" : "")
                  }
                >
                  Add Address
                </button>
              </p>

              <p
                className={
                  "text-gray-400 text-center h-full flex items-center justify-center text-sm pt-2 " +
                  (user.addresses.length !== 0 || addFormVisibility
                    ? "hidden"
                    : "")
                }
              >
                No User Addresses
              </p>

              <AddAddressForm
                handleSubmit={handleSubmit}
                handleAdd={handleAdd}
                setaddFormVisibility={setaddFormVisibility}
                addFormVisibility={addFormVisibility}
                register={register}
                errors={errors}
              />

              <div className="mt-2 space-y-6">
                <ul className="flex flex-col gap-2">
                  {user.addresses.map((address, index) => (
                    <UserProfileAddressCard
                      key={index}
                      index={index}
                      address={address}
                      handleDelete={handleDelete}
                      handleOpenForm={handleOpenForm}
                      handleSubmit2={handleSubmit2}
                      handleEdit={handleEdit}
                      setVisibilityIndex={setVisibilityIndex}
                      visibilityIndex={visibilityIndex}
                      register2={register2}
                      errors2={errors2}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserProfilePage;
