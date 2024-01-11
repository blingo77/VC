import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from '../../firebase-config/firebase'
import { useNavigate } from "react-router-dom";


const Login = ({setIsAuthoirzed}) => {

    const navigate = useNavigate()

    const signInWithGoogle = () => {

        signInWithPopup(auth, provider)
        .then((res) => {
            console.log(res)
            localStorage.setItem('isAuthoirzed', true)
            setIsAuthoirzed(true)

            const pfp = res.user.photoURL

            localStorage.setItem('pfp', pfp)

          navigate('/')

        })
        .catch((e) => {
            console.log(e)
        })

    }

  return (
    <>
      <button type="button" class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
};

export default Login;
