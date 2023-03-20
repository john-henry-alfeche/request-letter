import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

export const Header: FunctionComponent = () => {
  const router = useRouter();

  function handleLogout() {
    Cookies.remove("bearerToken");
    router.push("/");
  }
  return (
    <header className="fixed bg-gray-800 text-white h-12 flex items-center justify-end w-full px-4">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};
