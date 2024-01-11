import { useEffect, useState } from "react";
import {addDoc, collection} from 'firebase/firestore'
import {db, auth} from '../../firebase-config/firebase'
import { useNavigate } from "react-router-dom";

/*
Page for handling creation of new review postsr
*/

const PostReview = ({isAuthorized}) => {

    // Page Redirection
    const navigate = useNavigate()

    // Values for the full post
    const [rangeVal, setRangeVal] = useState(0)
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("")

// ----------- OnChange Funcitons --------------------------
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleRangeChange = (event) => {
        const currentValue = parseInt(event.target.value, 10);
        setRangeVal(currentValue);
        console.log("Current value: " + currentValue);
    }

    const handlePostChange = (event) => {
        setPost(event.target.value)
    }

    const postsCollectionRef = collection(db, "reviewPosts")
// --------------------------------------------------------------

    // Submits the post to firebase-database
    const submitPost = async () => {
        await addDoc(postsCollectionRef, {
            title : title,
            post: post,
            author : {name: auth.currentUser.displayName, email : auth.currentUser.email, id : auth.currentUser.uid,
            }
        })
        navigate('/reviews')
    }

    // Handles if a user tries to access the page without being logged in
    useEffect(() => {
        if(!isAuthorized){
            navigate('/login')
        }
    })

    return ( 
        <>
        <label htmlFor="title">Title: </label>
        <input id="title" placeholder="type..." onChange={handleTitleChange}/>

        <br></br>
        
        <label htmlFor="rate">Rate: </label>
        <input type="range"  id="rate"value={rangeVal} max="10" min="0" step="1" onChange={handleRangeChange}></input>

        <br></br>

        <label htmlFor="post">Post: </label>
        <textarea id="post" placeholder="Type here..." rows="9" cols="60" onChange={handlePostChange}/>

        <br></br>

        <button onClick={submitPost}>Post</button>
        </>

     );
}
 
export default PostReview;