import { authClient } from "@/lib/auth";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();



  const signIn = async () => {
    const data = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "http://localhost:5173/",
      },
      {
        onError: (error) => {
          console.error("Sign in error:", error);
        },
      }
    );
    console.log("Sign in data:", data);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    navigate("/");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <button
        onClick={signIn}
        className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default Signup;
