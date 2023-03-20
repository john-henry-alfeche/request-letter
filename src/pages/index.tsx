import { LoginForm } from "@/components/Form/LoginForm";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-b from-blue-200 to-blue-300">
      <LoginForm />
    </div>
  );
}
