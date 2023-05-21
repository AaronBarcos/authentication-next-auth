import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { set } from "lodash";

function search() {
  const [users, setUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [buttonFriend, setButtonFriend] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const getUserFriends = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/friends/${session.user._id}`);
        setUserFriends(res.data.friends.friends);
        setLoading(false);
        if (res.data.friends.friends.includes(user._id)) {
          setButtonFriend("Remove friend");
        } else {
          setButtonFriend("Add friend");
        }
      } catch (error) {
        // console.log(error.response.data.message);
        setLoading(false);
      }
    };
    getUserFriends();
  }, [session]);

  const getUsers = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/${search}`);
      setUsers(res.data.users);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  const handleFriend = async (friendId) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/friends/${session.user._id}`, {
        friendId,
      });
      setUserFriends(res.data.friends.friends);
      setLoading(false);
      if (res.data.friends.friends.includes(user._id)) {
        setButtonFriend("Remove friend");
      } else {
        setButtonFriend("Add friend");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  } else if (errorMessage) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={getUsers}>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        {users.map((user) => (
          <div key={user._id}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>

            <button onClick={() => handleFriend(user._id)}>{buttonFriend}</button>

            {/* {userFriends.includes(user._id) && userFriends ? (
              <button onClick={() => addFriend(user._id)}>Remove friend</button>
            ) : (
              <button onClick={() => addFriend(user._id)}>Add friend</button>
            )} */}
          </div>
        ))}
      </div>
    );
  }
}

export default search;
