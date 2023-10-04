import auth from "@/firebase/firebase.config";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <div className="bg-primary mb-5">
      <div className="container mx-auto">
        <div className="navbar text-primary-content">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products/addProduct">Add Product</Link>
                </li>
                <li>
                  {user ? (
                    <Link onClick={() => signOut()} href="/login">
                      Logout
                    </Link>
                  ) : (
                    <Link href="/login">Login</Link>
                  )}
                </li>
                <li>{!user && <Link href="/signup">Signup</Link>}</li>
              </ul>
            </div>
            <Link href="/" className="normal-case font-bold text-xl">
              Grocery-Shop
            </Link>
          </div>
          <div className="navbar-end">
            <ul className="menu menu-horizontal px-1 hidden lg:flex">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products/addproduct">Add Product</Link>
              </li>
              <li>
                {user ? (
                  <Link onClick={() => signOut()} href="/login">
                    Logout
                  </Link>
                ) : (
                  <Link href="/login">Login</Link>
                )}
              </li>
              <li>{!user && <Link href="/signup">Signup</Link>}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
