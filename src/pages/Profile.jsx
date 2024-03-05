import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axiosInstance from "../utils/axiosInstance";
import UserDetails from "../components/UserDetails";

const user = {
  username: "john_doe",
  email: "john@example.com",
  role: "Admin",
  createdDate: "2024-03-05",
};

function Profile() {
  console.log("Profile Page render");
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("useEffect running.....");
    const abortController = new AbortController();
    let isCalled = false;
    (async () => {
      const response = await axiosInstance.get("/api/v1/user/currentUser", {
        signal: abortController.signal,
      });
      if (!isCalled) console.log(`🚀 ~ response: Profile :: `, response);
      setData(response.data.data);
    })();

    return () => {
      console.log("Cleanup function runing.......");
      isCalled = true;
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <Banner title="Profile" />
      {data && <UserDetails user={data} />}
    </div>
  );
}

export default Profile;
