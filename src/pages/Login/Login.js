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
            const uID = res.user.uid

            localStorage.setItem('pfp', pfp)
            localStorage.setItem('uID', uID)

          navigate('/')

        })
        .catch((e) => {
            console.log(e)
        })

    }

  return (
    <>
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <div className="login-input">
        <input placeholder="Email" className="email"></input><br></br>
        <input placeholder="Password" className="password"/><br></br>
        <button>Login</button>
        </div>
      <div className="google-btn">
      <button type="button" class="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      </div>
      </div>
      </div>
    </>
  );
};

export default Login;
