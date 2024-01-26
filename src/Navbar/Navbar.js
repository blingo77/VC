import './Navbar.css'
import { Link } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import {auth} from '../firebase-config/firebase'
import vcLogo from '../images/VC-Logo-White.svg'

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
            
            <img width="3%"src={vcLogo}></img>
            

            <Link to="/" className='title-link'>
                <h1>Vegas Circle</h1>
            </Link>

            <div className="links">
                <Link to='/news' className='nav-link'>News</Link>
                <Link to='/map' className='nav-link'>Map</Link>
                <Link to='/reviews' className='nav-link'>Reviews</Link>
                <Link to='/rants' className='nav-link'>Rants</Link>
                {!isAuthorized && <Link to='/login' className='nav-link'>Login</Link>}
                {isAuthorized && <button className='logout-button' onClick={logout}>Logout</button>}
                {/*<Link to='/signup'>SignUp</Link>*/}
            </div>
            {isAuthorized && <img src={localStorage.getItem("pfp")} className='pfp-image' onError={() => { return (<img src={vcLogo}/>)}}></img>}

        </div>
     );
}
 
export default Navbar;