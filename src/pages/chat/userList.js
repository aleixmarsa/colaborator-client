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
    return <h3>...Loading</h3>;
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
