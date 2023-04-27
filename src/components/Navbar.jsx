import { useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav>
      <ul className="flex">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
