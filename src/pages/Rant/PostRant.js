import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import '../Rant-Review-Styles/Posts.css'
import Ghost from '../../images/unknownpfp.jpg'

const PostRant = ({ isAuthorized }) => {

    const navigate = useNavigate()

    const [isAnon, setIsAnon] = useState(false)
    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("")
    const [rantPost, setRantPost] = useState("")

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/login')
        }
    }, [])

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

    const handleAnonymous = () => {
        let checkbox = document.getElementById("anon-btn")

        console.log(checkbox.checked)
        if(checkbox.checked){
            setIsAnon(true)
        }
        else{
            setIsAnon(false)
        }
    }

    const postsCollectionRef = collection(db, "rantPosts")

    const submitPost = async () => {

        if(isAnon){await addDoc(postsCollectionRef, {
            title: title,
            rantPost: rantPost,
            pfpURL: Ghost,
            subject: subject,
            author: {
                name: "Anonymous", email: "Anonymous", id: auth.currentUser.uid,
                }
            })
        }
        else{
            await addDoc(postsCollectionRef, {
                title: title,
                rantPost: rantPost,
                pfpURL: auth.currentUser.photoURL,
                subject: subject,
                author: {
                    name: auth.currentUser.displayName, email: auth.currentUser.email, id: auth.currentUser.uid,
                    }
                })
        }
        
        navigate('/rants')
    }

    return (
        <>

            <div className="rant-review-post-container">
                <div className="create-post-container">
                    <div className="create-post-header">
                        <div className="pfp">
                            {isAnon ? 
                            <img src={Ghost}/>: 
                            <img src={localStorage.getItem('pfp')}/>}
                        </div>
                        <div className="create-title">
                            <input id="title" placeholder="Title..." onChange={handleTitleChange} maxLength="35"></input><br></br>
                        </div>
                    </div>

                    <div className="create-subject">
                        <input id="subject" placeholder="Subject..." onChange={handleSubjectChange}></input><br></br>
                    </div>
                    <div className="create-body">
                        <textarea id="rant" placeholder="Rant here..."  onChange={handleRantChange}></textarea><br></br>
                    </div>

                    <div className="post-anonymous-button">
                        <label htmlFor="anon-btn">Post anonymously: </label>
                        <input type="checkbox" id="anon-btn" onChange={handleAnonymous}/>
                    </div>
                    <div className="post-button">
                        <button onClick={submitPost}>Post</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostRant;