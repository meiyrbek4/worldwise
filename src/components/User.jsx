import { useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";
import styles from "./User.module.css";

function User() {
  const navigate = useNavigate();
  const defaultAvatar =
    "https://firebasestorage.googleapis.com/v0/b/chat-app-e2ad2.appspot.com/o/images%2Favatar_icon.png?alt=media&token=2ae0cf20-afff-4f7f-9c3c-2b6d97f35fc8";
  const photo =
    auth.currentUser.photoURL === null
      ? defaultAvatar
      : auth.currentUser.photoURL;
  console.log(auth.currentUser.photoURL);

  async function handleClick() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <div className={styles.user}>
      <img src={photo} alt="User Avatar" />

      <span>Welcome, {auth?.currentUser?.email.replace(/@.*/, "")}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
