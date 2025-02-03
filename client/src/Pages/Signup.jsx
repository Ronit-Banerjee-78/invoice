import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Text, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@chakra-ui/react";
import { useSignupUserMutation } from "../Redux/UserApi.js";
import { useDispatch } from "react-redux";
import { checkSignupUser } from "../../Utils.js/AuthUtils.js";

const formSchema = z.object({
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password atleast consists of 8 characters"),
});

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // const { token } = useSelector((state) => state.auth);
  // console.log(user, token);

  const [signupUser, { isLoading }] = useSignupUserMutation();

  // handle form submit

  const onFormSubmit = async (formData) => {
    try {
      const response = await signupUser({ ...formData }).unwrap();

      // Extract token and user from the response
      // console.log("Response", response);
      const { token, user } = response;
      // Call SingupUser Utils Function
      checkSignupUser(dispatch, user, token);
      navigate("/");
      toast({
        title: "Sign up Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: error?.data?.message,
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
    formState: { errors },
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
        autoComplete="off"
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-[90vw] md:w-[45vw] lg:w-[35vw] mt-16 p-4 border-2 mx-auto rounded-md border-solid border-slate-400"
      >
        {/* username */}
        <div className="mb-2">
          <label className="label">Username</label>
          <input {...register("username")} className="input text-black" />
          {errors?.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* email */}
        <div className="mb-2">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input text-black"
          />
          {errors?.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div className="mb-2">
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input text-black"
          />
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
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account ?
        <NavLink
          className="font-semibold mx-2 text-[#8973f9] text-base tracking-wide"
          to="/login"
        >
          Log In
        </NavLink>
      </p>
    </section>
  );
}

export default Signup;
