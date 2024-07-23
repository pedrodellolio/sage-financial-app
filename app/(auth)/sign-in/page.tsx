import SignInForm from "@/components/forms/sign-in-form";

export default function SignIn() {
  return (
    <div className="flex flex-row justify-center w-full">
      <div className="hidden lg:block w-1/2 h-screen bg-secondary-foreground/30"></div>
      <div className="lg:w-1/2 mt-32 lg:mt-0 flex flex-col justify-center items-center">
        <div className="w-80">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="text-sm text-muted-foreground mb-10">Entre com sua conta</p>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
