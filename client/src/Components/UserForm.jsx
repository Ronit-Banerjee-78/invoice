import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserProfileMutation } from "../Redux/UserApi";
import { updateUserProfile } from "../../Utils.js/AuthUtils";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username is required"),
  password: z.string().min(8, "Password must consist of at least 8 characters"),
});

function UserForm({ data, setIsFormVisible }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { username, email, _id } = data;
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email || "",
      username: username || "",
    },
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // handle form submit
  const onFormSubmit = async (formData) => {
    try {
      const response = await updateUser({ ...formData }).unwrap();

      // Call updateUserProfile function that will update the redux store and store the latest userdata in the localstorage.
      updateUserProfile(dispatch, formData);
      navigate(`/profile/${_id}`);
      setIsFormVisible(false);
      toast({
        title: "User Details Updated Successfully",
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

  return (
    <div className="UserForm">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-[90%] md:w-[50vw] lg:w-[30vw] mt-16 mb-8 p-4 border-2 mx-auto rounded-md border-solid border-slate-400"
      >
        {/* Username */}
        <div className="mb-2">
          <label className="label">Username</label>
          <input {...register("username")} className="input text-black" />
          {errors?.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Submit Button */}
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
          {isLoading ? "Updating ..." : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default UserForm;
