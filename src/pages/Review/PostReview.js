import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../../firebase-config/firebase'
import { useNavigate } from "react-router-dom";

/*
Page for handling creation of new review postsr
*/

const PostReview = ({ isAuthorized }) => {

    // Page Redirection
    const navigate = useNavigate()

    // Values for the full post
    const [rangeVal, setRangeVal] = useState(0)
    const [post, setPost] = useState("")
    const [title, setTitle] = useState("")
    const postsCollectionRef = collection(db, "reviewPosts")

    // ----------- OnChange Funcitons --------------------------
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleRangeChange = (event) => {
        const currentValue = parseInt(event.target.value, 10);
        setRangeVal(currentValue);
        console.log("Current value: " + currentValue);

        return currentValue
    }

    const handlePostChange = (event) => {
        setPost(event.target.value)
    }

    // --------------------------------------------------------------

    let date = new Date()
    let postDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`


    // Submits the post to firebase-database
    const submitPost = async () => {


        const newPost = (postsCollectionRef, {
            title: title,
            post: post,
            rateVal: rangeVal,
            pfpURL: auth.currentUser.photoURL,
            time : serverTimestamp(),
            date : postDate,
            author: {
                name: auth.currentUser.displayName, email: auth.currentUser.email, id: auth.currentUser.uid,
            }
        })
        try{
            await addDoc(postsCollectionRef, newPost)
            navigate('/reviews')
        }catch(e){
            console.error(e)
        }
        navigate('/reviews')
    }

    // Handles if a user tries to access the page without being logged in
    useEffect(() => {
        if (!isAuthorized) {
            navigate('/login')
        }
    }, [])

    return (
 
        <div className="rant-review-post-container">
        <div className="create-post-container">
            <div className="create-post-header">
                <div className="pfp">
                    <img src={localStorage.getItem('pfp')} />
                </div>
                <div className="create-title">
                    <input id="title" placeholder="Title..." onChange={handleTitleChange} maxLength="35"></input><br></br>
                </div>
            </div>

            <div className="create-subject">
                <input id="subject" type="range"placeholder="Subject..."min="0" max="10" step="1" onChange={handleRangeChange} ></input> <p>{rangeVal}/10</p><br></br>
            </div>
            <div className="create-body">
                <textarea id="rant" placeholder="Rant here..."  onChange={handlePostChange}></textarea><br></br>
            </div>
            <div className="post-button">
                <button onClick={submitPost}>Post</button>
            </div>
        </div>
    </div>

    );
}

export default PostReview;