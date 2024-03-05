import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import ConfirmBox from "../../components/ConfirmBox";
import toast from "react-hot-toast";

const fetchAllUsers = async (URL, controller) => {
  return await axiosInstance.get("/api/v1/user", {
    signal: controller.signal,
  });
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    let isCalled = false;
    (async () => {
      try {
        const response = await fetchAllUsers("/api/v1/user", abortController);
        if (!isCalled) console.log(`🚀 ~ response: Profile :: `, response);
        setUsers(response.data.data);
      } catch (error) {
        console.log("Error at mounting fetchAllUsers in Dashboard :: ", error);
      }
    })();

    return () => {
      console.log("Cleanup function running.......");
      isCalled = true;
      abortController.abort();
    };
  }, []);

  function openDelete(data) {
    console.log("openDelete function");
    setOpen(true);
    setDeleteData(data);
  }

  async function deleteUser() {
    try {
      console.log("deleteUser function");
      setOpen(false);

      const response = await axiosInstance.delete(
        `/api/v1/user/${deleteData?._id}`,
      );
      console.log(`🚀 ~ deleteUser ~ response:`, response);
      const response1 = await axiosInstance.get("/api/v1/user");
      console.log(`🚀 ~ deleteUser ~ response1:`, response1);
      setUsers(response1.data.data);
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log("Error : deleteUser function while deleting user = ", error);
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <div className="mt-8 flex h-full w-[100vw] flex-col items-center justify-center px-10 py-8">
        <h1 className="text-3xl font-bold">List All Users</h1>
        <div className="flex flex-col">
          <div className="mt-8 items-center overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="font-lg px-6 py-4 text-sm text-white"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="font-lg px-6 py-4 text-sm text-white"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="font-lg px-6 py-4 text-sm text-white"
                      >
                        Role Type
                      </th>
                      <th
                        scope="col"
                        className="font-lg px-6 py-4 text-sm text-white"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b-2 border-black">
                    {users.map((data, index) => (
                      <tr
                        key={index}
                        className="border-b-2 border-black bg-white"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-xl font-semibold text-gray-900">
                          {data.username}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-xl font-semibold text-gray-900">
                          {data.email}
                        </td>
                        <td
                          className={`${data.role === "Admin" ? "text-red-600" : "text-green-600"} whitespace-nowrap px-6 py-4 text-xl font-semibold uppercase text-gray-900`}
                        >
                          {data.role}
                        </td>
                        <td className="flex items-center justify-between  space-x-4 whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                          {/* <Link
                            to={`/users/${data.id}`}
                            className="rounded-lg bg-teal-600 px-6 py-2 text-white"
                          >
                            View
                          </Link> */}
                          {/* <Link
                            to={`/edit-user/${data.id}`}
                            className="rounded-lg bg-blue-600 px-6 py-2 text-white"
                          >
                            Edit
                          </Link> */}
                          <button
                            onClick={() => openDelete(data)}
                            to={"#"}
                            className="rounded-lg bg-red-600 px-6 py-2 text-white disabled:cursor-not-allowed disabled:opacity-25"
                            disabled={data.role === "Admin" ? true : false}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <ConfirmBox
          title={deleteData.username}
          closeDialog={() => setOpen(false)}
          deleteFunction={deleteUser}
        />
      )}
    </>
  );
};

export default Dashboard;
