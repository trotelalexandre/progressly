import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { RiGoogleFill } from "@remixicon/react";

interface GoogleButtonProps {
  signup?: boolean;
}

export default function GoogleButton({ signup }: GoogleButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full"
      loading={pending}
      disabled={pending}
    >
      {!pending && (
        <RiGoogleFill
          className="me-2 text-[#DB4437] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
      )}
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        `${signup ? "Sign up" : "Login"} with Google`
      )}
    </Button>
  );
}
