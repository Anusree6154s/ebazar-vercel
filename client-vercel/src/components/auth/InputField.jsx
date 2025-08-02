
export default function InputField({ register, errors, name }) {
  console.log(name)
  return (
    <>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Email not valid",
          },
        })}
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type="email"
        placeholder="Email"
        autoComplete="true"
      />
      <p className="text-xs text-warning">{errors?.email?.message}</p>
    </>
  );
}
