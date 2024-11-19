import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleButton({ signup }: { signup?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      className="w-full"
      type="submit"
      disabled={pending}
    >
      {signup ? "Sign up" : "Login"} with Google
      <FaGoogle className="w-6 h-6" />
    </Button>
  );
}
