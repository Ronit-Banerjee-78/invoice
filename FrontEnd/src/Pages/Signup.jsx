import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@chakra-ui/react";
import { useSignupUserMutation } from "../Redux/UserSlice";

const formSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password atleast consists of 8 characters"),
});

function Signup() {
  const toast = useToast();

  const [signupUser, { isLoading }] = useSignupUserMutation();

  // handle form submit

  const onFormSubmit = async (formData) => {
    try {
      await signupUser({ ...formData }).unwrap();
      toast({
        title: "Sign up Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed to Sign up",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  return (
    <section className="">
      <article className="flex items-center justify-between p-4">
        <Text
          as="h1"
          letterSpacing="0.1em"
          fontWeight="700"
          textTransform="uppercase"
          fontSize={{ base: "1.25em", md: "1.5em" }}
        >
          Invoicely
        </Text>
      </article>

      {/* form */}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-[90vw] md:w-[25vw] p-4 border-2 mx-auto rounded-md border-solid border-slate-400"
      >
        {/* username */}
        <div className="mb-2">
          <label className="label">Username</label>
          <input {...register("username")} className="input" />
          {errors?.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* email */}
        <div className="mb-2">
          <label className="label">Email</label>
          <input {...register("email")} className="input" />
          {errors?.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div className="mb-2">
          <label className="label">Password</label>
          <input {...register("password")} className="input" />
          {errors?.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button
          py="2"
          px="6"
          w="full"
          bg="#8973f9"
          color="white"
          fontWeight="600"
          letterSpacing="wider"
          rounded="md"
          type="submit"
          my="6"
        >
          {isLoading ? "Submitting ..." : "Submit"}
          Submit
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account ?{" "}
        <NavLink
          className="font-semibold  text-[#8973f9] text-base tracking-wide"
          to="/login"
        >
          Login
        </NavLink>{" "}
      </p>
    </section>
  );
}

export default Signup;
