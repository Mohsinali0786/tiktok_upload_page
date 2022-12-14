import React from "react";
import useAuthStore from "../store/authStore";
import { BiUser } from "react-icons/bi";
import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import { useRouter } from "next/router";

const Register = () => {
  const { addUser }: { addUser: any } = useAuthStore();

  const Router = useRouter();
  return (
    <div className="w-full absolute">
      <div className="flex flex-col justify-center pt-10 items-center mt-15 w-full ">
        <p className="mb-8 pb-5"></p>
        <p className="mb-8 "></p>
        <BiUser className="mb-3 text-gray-900 text-8xl cursor-pointer" />
        <p className="mb-3 text-lg text-gray-900 font-medium">
          Sign up for an account
        </p>
        <GoogleLogin
          onSuccess={(response) => {
            createOrGetUser(response, addUser);
            Router.back();
          }}
          onError={() => console.log("Error")}
        />
        {/* <GoogleLogin
          onSuccess={(response) => {
            console.log('response', response)
            createOrGetUser(response, addUser)
          }}
          clientId={`202056254581-atll6adadjh6hpum280usr41a6o7uvhc.apps.googleusercontent.com`}
          onFailure={(e) => console.log("Error", e)}
        /> */}
      </div>
    </div>
  );
};

export default Register;
