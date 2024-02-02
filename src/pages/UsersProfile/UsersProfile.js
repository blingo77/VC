import { useParams } from "react-router-dom";

const UserProfile = () => {
    
    const {id} = useParams()
    console.log('working')

    return ( 
        <>
            <p>{id}</p>
        </>
     );
}
 
export default UserProfile;