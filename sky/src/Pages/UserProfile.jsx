import { useAuth } from "../Hooks/authContext";
import { useLoaderData, useNavigate } from "react-router";

export default function UserProfile() {
  const userInfo = useLoaderData();

  console.log(userInfo);

  const { user } = useAuth();

  return <div>profile page</div>;
}
