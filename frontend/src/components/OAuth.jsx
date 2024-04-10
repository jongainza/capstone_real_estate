import React from "react";
import Button from "react-bootstrap/Button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase";
import axios from "/helpers/axios.config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await axios.post("/auth/firebase", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      dispatch(signInSuccess(res));
      navigate("/");
    } catch (error) {
      console.log("error signing in with google", error);
    }
  };
  return (
    <Button
      variant="primary"
      type="button"
      onClick={handleGoogleClick}
      style={{
        width: "100%",
        color: "white",
        backgroundColor: "red",
        borderColor: "black",
      }}
    >
      Continue with your google account
    </Button>
  );
}
