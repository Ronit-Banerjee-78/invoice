import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../App";
import { useContext } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import UserForm from "../Components/UserForm";
import { Text, CircularProgress } from "@chakra-ui/react";
import { useGetUserQuery, useDeleteUserMutation } from "../Redux/UserApi";
import { useNavigate, NavLink } from "react-router-dom";
import { logoutUser } from "../../../BackEnd/Controllers/UserAuthController";
import { checkLogoutUser } from "../../Utils.js/AuthUtils";

export const calculateLastUpdateDate = (lastUpdateDate) => {
  const date = new Date(lastUpdateDate);
  date.setDate(date.getDate());
  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
};

function Profile() {
  const themeData = useContext(ThemeContext);
  const { theme } = themeData;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();
  const { _id } = user || {};
  const { data, refetch, isLoading, isError, error } = useGetUserQuery(_id);

  const [deleteUser, { isLoading: isDeleteLoading }] =
    useDeleteUserMutation(_id);

  // console.log("Redux User", user);
  // console.log("DB User", data);

  useEffect(() => {
    refetch();
  }, [user]);

  const handleDeleteUser = async () => {
    deleteUser();
    // await logoutUser().unwrap();
    // // Call LogoutUser Utils Function
    // checkLogoutUser(dispatch);
  };

  const handleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const { updatedAt, username, email } = data || {};
  const lastUpdateDate = calculateLastUpdateDate(updatedAt);

  return (
    <div className="p-4 relative flex items-center justify-center">
      <NavLink to="/" className="absolute top-0 md:top-10 left-5">
        <Text
          gap="0"
          maxW="fit-content"
          _hover={{
            color: "#775df7",
          }}
        >
          <MdOutlineKeyboardDoubleArrowLeft size={32} />
        </Text>
      </NavLink>
      <div
        className={`m-6 p-6 w-[90%] md:w-[50vw] lg:w-[50vw] rounded-lg shadow-lg ${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-gray-800 text-white"
        }`}
      >
        {isLoading ? (
          <section className="flex items-center justify-center min-h-full">
            <CircularProgress
              isIndeterminate
              size="75px"
              thickness="10px"
              color="#8973f9"
            />
          </section>
        ) : (
          // Render user details if not loading
          <>
            <div className="flex items-center justify-center">
              <div className="relative w-16 h-16 rounded-full text-white bg-gray-300 dark:bg-gray-700">
                <p className="absolute font-bold top-[20%] text-3xl left-[35%]">
                  {username?.charAt(0) || ""}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold tracking-widest">
                {username || "Username"}
              </h2>
              <p className="text-sm text-gray-500 tracking-widest dark:text-gray-400">
                {email || "Email"}
              </p>
              <p className="mt-4 text-xs tracking-widest text-gray-400">
                Last Edited: {lastUpdateDate}
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white tracking-wider font-semibold rounded-lg hover:bg-blue-600"
                onClick={() => handleFormVisibility()}
              >
                {isFormVisible ? (
                  <MdOutlineCancel size={22} />
                ) : (
                  <RiEdit2Fill size={22} />
                )}
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white  tracking-wider font-semibold rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser()}
              >
                <IoTrashBinSharp size={22} />
              </button>
            </div>
          </>
        )}
        {isFormVisible && (
          <UserForm data={data} setIsFormVisible={setIsFormVisible} />
        )}
      </div>
    </div>
  );
}

export default Profile;
