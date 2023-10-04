import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import auth from "@/firebase/firebase.config";
import RootLayout from "@/components/Layouts/RootLayout";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  //custom error state
  const [networkError, setNetworkError] = useState("");
  const [wrongPassError, setWrongPassError] = useState("");
  const [notFoundUserError, setNotFoundUserError] = useState("");

  //signin with email function
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // after signup navigation
  if (user) {
    router.push("/");
  }

  //firebase error handling
  useEffect(() => {
    if (error) {
      if (error.message.includes("wrong-password")) {
        setWrongPassError("Password is wrong");
        setNetworkError("");
        setNotFoundUserError("");
      } else if (error.message.includes("user-not-found")) {
        setNotFoundUserError("Invalid User, enter your valid email");
        setWrongPassError("");
        setNetworkError("");
      } else if (error.message.includes("network-request-failed")) {
        setNetworkError("Check your network");
        setWrongPassError("");
        setNotFoundUserError("");
      } else {
        setNetworkError("");
        setWrongPassError("");
        setNotFoundUserError("");
      }
    }
  }, [error]);

  //signup handle function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = await signInWithEmailAndPassword(email, password);

    if (user?.user) {
      e.target.reset();
    } else {
    }
  };

  return (
    <div className="card w-1/3 mx-auto glass shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title mb-5 justify-center uppercase">Login</h2>
        <form onSubmit={handleSubmit} action="">
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Your Password"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            required
          />

          {/* --firebase error-- */}
          <p className="text-error mb-3">
            {wrongPassError || networkError || notFoundUserError}
          </p>

          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <input type="submit" value="Login" className="btn btn-primary" />
          )}
        </form>
        <div>
          <p className="mt-3">
            Don't have any Account ? Please{" "}
            <Link href="/signup" className="text-primary">
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
