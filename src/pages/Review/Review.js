import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";

const Reviews = ({isAuthorized}) => {

    const [postList, setPostList] = useState([])
    const postsCollectionRef = collection(db, 'reviewPosts')

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getPosts()
    })

    const deletePost = async (id) => {
        const postDoc = doc(db, 'reviewPosts', id)
        await deleteDoc(postDoc)
    }

    return ( 

        <>
        <Link to='/post-review'>Post Review</Link>
        {postList.map((post) => {
            return (
                <div className="post-container">
                    <h1>{post.title}</h1>
                    <p>{post.post}</p>
                    <h3>@ {post.author.name}</h3>
                    {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => {deletePost(post.id)}}>X</button>}
                </div>
            )
        })}

        </>
     );
}
 
export default Reviews ;