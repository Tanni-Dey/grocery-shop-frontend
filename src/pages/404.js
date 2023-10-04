import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p>Page Not Found</p>
        <Link className="btn btn-link" href="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
