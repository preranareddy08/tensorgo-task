import { Link } from "react-router-dom";

const SignUpPage = () => {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className="text-center font-serif">
      <h1 className="font-bold  text-3xl text-gray-900 pt-9">
        Billing and Invoice Automation
      </h1>
      <div className="bg-gray-50 rounded-xl mt-[60px] border shadow-2xl w-[500px] h-[300px] m-auto">
        <h2 className="m-9 mb-9 font-semibold text-2xl ">Sign Up</h2>
        <button className="" onClick={googleAuth}>
          <div className="flex flex-row bg-gray-200 hover:bg-gray-300 border rounded-md ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TnrQxTZSfvVAv5WMvi3cNJZdO09N-NfkXQ&s"
              alt="google icon"
              className="w-7 rounded-lg"
            />
            <span className="text-sm text-black p-[2px]">
              Sign Up with Google
            </span>
          </div>
        </button>
        <p className="font-semibold mt-8">
          Already have account ?{" "}
          <Link to="/login" className="text-green-500 hover:text-green-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
