import { useAuth } from "../Hooks/authContext";
import { useLoaderData, useNavigate } from "react-router";

import Logout from "../Components/LogOut";

export default function UserProfile() {
  const userInfo = useLoaderData();

  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  console.log(userInfo);

  return (
    <div>
      <div>profile page for {user.username}</div>
      <Logout />
    </div>
  );
}
