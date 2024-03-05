import dayjs from "dayjs";

const UserDetails = ({ user }) => {
  const formattedCreatedAt = dayjs(user.createdAt).format(
    "D MMMM YYYY hh:mm:ss A",
  );

  console.log(`🚀 ~ UserDetails ~ formattedCreatedAt:`, formattedCreatedAt);
  return (
    <div className="container mx-auto mt-8">
      <div className="rounded bg-white px-8 py-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Username:
          </label>
          <p className="text-lg text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Email:
          </label>
          <p className="text-lg text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold uppercase text-gray-700">
            Role:
          </label>
          <p className="text-lg text-gray-700">{user.role}</p>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Created Date:
          </label>
          <p className="text-lg text-gray-700">{formattedCreatedAt}</p>
        </div>
        {/* <div className="flex items-center justify-between">
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Update
          </button>
          <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserDetails;
