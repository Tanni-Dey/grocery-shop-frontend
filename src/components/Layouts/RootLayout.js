import React from "react";
import Navbar from "@/components/Shared/Navbar";
import Head from "next/head";

const RootLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Grocery Shop</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default RootLayout;
