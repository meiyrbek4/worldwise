import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styles from "./Login.module.css";
import Spinner from "../components/Spinner";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className={styles.login}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SignIn setIsLoading={setIsLoading} />
          <SignUp setIsLoading={setIsLoading} />
        </>
      )}
    </main>
  );
}

export default Login;
