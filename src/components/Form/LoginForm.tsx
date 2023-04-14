import { setBearerToken } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { LoginIcon } from "../Icon/LoginIcon";

export const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://122.3.104.117:5660/authentication/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setBearerToken(response.data.access_token);
        //router.push(`request-letters?jwt=${response.data.access_token}`);
        router.push("request-letters");
      } else {
        setAlert("Invalid username or password");
      }
    } catch (error) {
      setAlert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-xs md:max-w-xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex flex-col items-center space-y-3 mb-3">
          <LoginIcon />
          <h1 className="text-2xl font-bold mt-2 mb-8 text-center">
            Request Letter Approval System
          </h1>
        </div>
        {alert && (
          <div className="border p-4 bg-red-100 border-red-500 text-red-700 my-4">
            <div className="flex-wrap text-center">
              <div className="ml-1">
                <p className="text-sm font-medium">
                  Incorrect username and password.
                </p>
              </div>
            </div>
          </div>
        )}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
