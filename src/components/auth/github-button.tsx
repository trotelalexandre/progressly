import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { RiGithubFill } from "@remixicon/react";

interface GithubButtonProps {
  signup?: boolean;
}

export default function GithubButton({ signup }: GithubButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full"
      disabled={pending}
    >
      {!pending && (
        <RiGithubFill
          className="me-2 text-[#333333] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
      )}
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        `${signup ? "Sign up" : "Login"} with Github`
      )}
    </Button>
  );
}
