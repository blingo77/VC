import './Navbar.css'
import { Link } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth} from '../firebase-config/firebase'

const Navbar = ({isAuthorized, setIsAuthorized}) => {

    const logout = () => {
        signOut(auth)
        .then(() => {
            localStorage.clear()
            setIsAuthorized(false)
            window.location.pathname = '/login'
        })
    }

    return ( 
        <div className="navBar">
            <h1>Vegas Circle</h1>

            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/reviews'>Reviews</Link>
                <Link to='/rants'>Rants</Link>
                {!isAuthorized && <Link to='/login'>Login</Link>}
                {isAuthorized && <button className='logout-button' onClick={logout}>Logout</button>}
                {/*<Link to='/signup'>SignUp</Link>*/}
            </div>
            {isAuthorized && <img src={localStorage.getItem("pfp")} className='pfp-image'></img>}

        </div>
     );
}
 
export default Navbar;