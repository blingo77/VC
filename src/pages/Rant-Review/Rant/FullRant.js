import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../../../firebase-config/firebase";
import { doc, getDoc } from "firebase/firestore";

const FullRant = () => {
    const {id} = useParams()
    const [post, setPost] = useState({})

    useEffect(() =>{
        const docRef = doc(db, 'rantPosts', id)

        getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists){
    
                const data = docSnapshot.data()
                console.log(data)
                setPost({
                    title: data.title,
                    pfpURL: data.pfpURL,
                    subject: data.subject,
                    rantPost: data.rantPost,
                    date: data.date,
                    like: data.like,
                    name: data.author.name
                }) 
            }
        })
    }, [])

    return ( 
        <div className="rant-review-page-container">
        <div className="post-container">
        <div className="post-header">
            <div className="pfp">
                <img src={post.pfpURL} />
            </div>
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="delete"></div>
        </div>
        <h4>{post.subject}</h4>
        <p>{post.rantPost}</p>
        <h5>{post.date}</h5>
        <p>{post.like} Likes</p>
        <h3>@{post.name}</h3>

    </div>
    </div>
     );
}
 
export default FullRant;