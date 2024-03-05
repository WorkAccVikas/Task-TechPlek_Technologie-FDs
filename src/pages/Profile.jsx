import { useEffect } from "react";
import Banner from "../components/Banner";
import axiosInstance from "../utils/axiosInstance";

function Profile() {
  console.log("Profile Page render");

  useEffect(() => {
    console.log("useEffect running.....");
    const abortController = new AbortController();
    let isCalled = false;
    (async () => {
      const response = await axiosInstance.get("/api/v1/user/currentUser", {
        signal: abortController.signal,
      });
      if (!isCalled) console.log(`🚀 ~ response: Profile :: `, response);
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
    </div>
  );
}

export default Profile;
