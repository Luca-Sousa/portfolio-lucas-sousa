import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./_components/login-form";
import Image from "next/image";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center text-xl font-medium">
          <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground">
            <Image alt="Logo" src="/logo.png" fill className="object-contain" />
          </div>
          Lucas Sousa
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
