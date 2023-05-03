// A react component to search other users by username

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

function search() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  const getUsers = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/${search}`);
      setUsers(res.data.user);
      setLoading(false);
      console.log(users)
    } catch (error) {
      setErrorMessage(error.response.data.message);
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
      </div>
    );
  }
}

export default search;
