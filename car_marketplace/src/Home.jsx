import React from "react";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import Header from "./components/Header";

const Home = () => {
  return (
    <div>
      {/* <SignInButton mode="model" forceRedirectUrl="/">
        <Button>Sign In</Button>
      </SignInButton> */}
      <Header />
    </div>
  );
};

export default Home;
