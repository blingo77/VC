import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";

const PostRant = ({isAuthorized}) => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("")
    const [rantPost, setRantPost] = useState("")

    useEffect(() => {
        if(!isAuthorized){
            navigate('/login')
        }
    })

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
        console.log(title)
    }

    const handleSubjectChange = (event) => {
        setSubject(event.target.value)
    }

    const handleRantChange = (event) => {
        setRantPost(event.target.value)

    }

    const postsCollectionRef = collection(db,"rantPosts")

    const submitPost = async () => {
        await addDoc(postsCollectionRef, {
            title: title,
            rantPost: rantPost,
            subject: subject,
            author : {name: auth.currentUser.displayName, email : auth.currentUser.email, id : auth.currentUser.uid,
            }
        })

        navigate('/rants')
    }

    return ( 
        <>
        <label htmlFor="title">Title: </label>
        <input id="title" placeholder="Type..." onChange={handleTitleChange}></input><br></br>

        <label htmlFor="subject">Subject</label>
        <input id="subject" placeholder="subject..." onChange={handleSubjectChange}></input><br></br>

        <label htmlFor="rant">Rant: </label>
        <textarea id="rant" placeholder="Rant here..." rows="9" cols="60" onChange={handleRantChange}></textarea><br></br>

        <button onClick={submitPost}>Post</button>
        </>
     );
}
 
export default PostRant;