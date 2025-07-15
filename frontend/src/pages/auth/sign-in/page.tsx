import { authClient } from "@/lib/auth";
import SignInView from "@/modules/auth/ui/view/sign-in-view";
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    navigate("/");
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">

      <SignInView/>
    </div>
  )
};

export default SignIn;
