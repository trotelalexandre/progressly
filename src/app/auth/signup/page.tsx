import AuthForm from "@/components/auth/auth-form";

export default async function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <AuthForm signup />
    </div>
  );
}
