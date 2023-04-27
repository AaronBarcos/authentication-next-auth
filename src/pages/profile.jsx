import { useSession } from "next-auth/react";

function profile() {

    const { data: session, status } = useSession();
  return (
   <div>
        <h1>Profile</h1>
        <h3>
            {session ? (
                <>
                    <p>Username: {session.user.username}</p>
                    <p>Email: {session.user.email}</p>
                </>
            ) : (
                <p>You are not logged in</p>
            )}
        </h3>


    </div>
  )
}

export default profile