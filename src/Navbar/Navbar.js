import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className="navBar">
            <h1>Vegas Circle</h1>

            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/reviews'>Reviews</Link>
                <Link to='/rants'>Rants</Link>
                <Link to='/login'>Login</Link>
                {/*<Link to='/signup'>SignUp</Link>*/}
            </div>
        </div>
     );
}
 
export default Navbar;