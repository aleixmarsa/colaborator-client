import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startChatService } from "../../services/chat.services";
import { getAllUsersService } from "../../services/user.services";

const UserList = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsersService();
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e,user) => {
    e.preventDefault();
    console.log(`Trying to start chat with ${user.name}`);
    try{
      const response = await startChatService(user._id)
      navigate(`/chat/${response.data._id}`)
    }catch(err){
      console.log(err)
    }
  };

  if (!users) {
    return(
      <button
        type="button"
        className="absolute left-0 right-0 top-0 bottom-0 m-auto w-52 h-16 inline-flex items-center justify-center px-5 py-5 font-normal text-2xl shadow rounded-md text-white bg-mainColor transition ease-in-out duration-150 cursor-not-allowed"
        disabled=""
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading ...
      </button>
    );
  }

  return (
    <div>
      <h1>Users</h1>
      <hr />
      {users.map((user) => {
        return (
          <div key={user._id} className ="mt-3">
            <p>
              <b>Name:</b>
              {user.name}
            </p>
            <button className="bg-gray-500" onClick={(e) => handleClick(e, user)}>
              Chat with {user.name}
            </button>
            <hr className ="mt-3"/>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;
