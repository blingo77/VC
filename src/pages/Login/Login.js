import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from '../../firebase'


const Login = ({setIsAuthoirzed}) => {

    const signInWithGoogle = () => {

        signInWithPopup(auth, provider)
        .then((res) => {
            console.log(res)
            localStorage.setItem('isAuthoirzed', true)
            setIsAuthoirzed(true)
        })

    }

  return (
    <>
      <button type="button" class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <button onClick={signInWithGoogle}>Sign in</button>
    </>
  );
};

export default Login;
