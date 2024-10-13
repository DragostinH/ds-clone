"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { FaGoogle, FaGithub, FaReddit } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const iconProviders = [FaGoogle, FaGithub, FaReddit];

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/messages");
    }
  }, [session.status, router]);
  const handleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: FieldValues) => {
    try {
      console.log("data", data);
      console.log("registering");
    } catch (error) {}
  };

  const handleLogin = async (data: FieldValues) => {
    try {
      await signIn("credentials", {
        callbackUrl: "/messages",
        ...data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      switch (variant) {
        case "LOGIN":
          await handleLogin(data);
          break;
        case "REGISTER":
          await handleRegister(data);
          break;
        default:
      }
      setLoading(false);
    } catch (error) {}
  };
  return (
    <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {variant === "REGISTER" && (
          <Input
            id="name"
            label="Name"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
        )}

        <Input
          id="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          disabled={isLoading}
        />

        <div className="">
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Login" : "Register"}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div
            className="
          absolute
          inset-0
          flex
          items-center
          "
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div
            className="
        relative
        flex
        justify-center
        text-sm
          "
          >
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div
          className="
        mt-6 flex gap-2
        "
        >
          <div className="flex gap-4 w-full">
            {iconProviders.map((Icon, index) => (
              <AuthSocialButton
                key={index}
                icon={Icon}
                onClick={() => console.log("clicked")}
              />
            ))}
          </div>
        </div>
        <div
          className="
        flex gap-2
        justify-center
        text-sm
        mt-6
        px-2
        text-gray-500
        "
        >
          <div className="">
            {variant === "LOGIN"
              ? "New to the site?"
              : "Already have an account?"}
          </div>
          <div onClick={handleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create a new account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
