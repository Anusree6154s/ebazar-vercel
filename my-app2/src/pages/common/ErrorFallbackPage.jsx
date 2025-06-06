import { useNavigate } from "react-router-dom";

export default function ErrorFallbackPage() {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[75%] bg-white px-[5%] rounded-md">
        <div className="grid grid-cols-2 gap-2 mx-auto my-auto">
          <div>
            <img
              src="/images/error-page-image.png"
              alt="error.png"
              className="w-[200%]"
            />
          </div>
          <div className="flex flex-col gap-4 items-center text-center justify-center">
            <h1 className="font-bold text-2xl">Oops! Error</h1>
            <h6>There seems to be a server issue. </h6>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={() => navigate("/")}
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
