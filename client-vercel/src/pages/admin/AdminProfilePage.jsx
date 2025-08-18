import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux";
import { AdminProfileCard, AdminProfileForm, BackButton, Loader } from "../../components";


function AdminProfilePage() {
  const methods = useForm();
  const { setValue } = methods;

  const user = useSelector(selectLoggedInUser);

  const [addFormVisibility, setaddFormVisibility] = useState(false);

  const handleForm = () => {
    Object.entries(user).forEach(([key, value]) => {
      if (key === "address" && value) {
        Object.entries(value).forEach(([addrKey, addrValue]) => {
          addrValue && setValue(addrKey, addrValue);
        });
      } else if (key === "image" && value) {
        setValue("image", value);
        setValue("image2", value); 
      } else {
        value && setValue(key, value);
      }
    });

    setaddFormVisibility(!addFormVisibility);
  };

  if (!user) return <Loader />;

  return (
    <>
      <div className="mb-5 flex justify-between">
        <BackButton />

        <button
          onClick={handleForm}
          className={`rounded-md bg-customBlue dark:bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm bg-opacity-80 hover:bg-opacity-100 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-customBlue ${
            addFormVisibility ? "hidden mt-6" : ""
          }`}
        >
          Edit
        </button>
      </div>

      <div className=" bg-white dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800 max-w-7xl px-6 py-14 sm:px-6 lg:px-8 mb-6">
        <AdminProfileCard addFormVisibility={addFormVisibility} user={user} />
        <FormProvider {...methods}>
          <AdminProfileForm />
        </FormProvider>
      </div>
    </>
  );
}

export default AdminProfilePage;
