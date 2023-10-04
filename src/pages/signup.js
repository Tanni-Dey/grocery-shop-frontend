import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import auth from "@/firebase/firebase.config";
import RootLayout from "@/components/Layouts/RootLayout";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();

  //custom error state
  const [confirmPassError, setConfirmPassError] = useState("");
  const [weakPassError, setWeakPassError] = useState("");
  const [usedEmailError, setUsedEmailError] = useState("");
  const [networkError, setNetworkError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // after signup navigation
  if (user) {
    router.push("/");
  }

  //custom error handilng
  useEffect(() => {
    if (error) {
      if (error.message.includes("weak-password")) {
        setWeakPassError("Give 6 character for password");
        setNetworkError("");
        setUsedEmailError("");
      } else if (error.message.includes("email-already-in-use")) {
        setUsedEmailError("This email already used");
        setWeakPassError("");
        setNetworkError("");
      } else if (error.message.includes("network-request-failed")) {
        setNetworkError("Check your network");
        setWeakPassError("");
        setUsedEmailError("");
      } else {
        setNetworkError("");
        setWeakPassError("");
        setUsedEmailError("");
      }
    }
  }, [error]);

  //signup handle function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const cPassword = e.target.cPassword.value;

    if (password !== cPassword) {
      setConfirmPassError("Password and Confim Password are not same");
    } else {
      const user = await createUserWithEmailAndPassword(email, password);
      setConfirmPassError("");

      if (user?.user) {
        e.target.reset();
      } else {
      }
    }
  };

  return (
    <div className="card w-1/3 mx-auto glass shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title mb-5 justify-center uppercase">Signup </h2>
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
          <input
            name="cPassword"
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            required
          />

          <p className="text-error">
            {confirmPassError !== "" ? confirmPassError : ""}
          </p>

          {/* --firebase error-- */}
          <p className="text-error mb-3">
            {weakPassError || networkError || usedEmailError}
          </p>

          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          )}
        </form>
        <div>
          <p className="mt-3">
            Already have any Account ? Please{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

SignupPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
