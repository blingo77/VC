import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import { useEffect, useState } from "react";

const Rant = ({isAuthorized}) => {

    const [postList, setPostList] = useState([])
    const postsCollectionRef = collection(db, 'rantPosts')

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getPosts()
    })

    const deletePost = async (id) => {
        const postDoc = doc(db, 'rantPosts', id)
        await deleteDoc(postDoc)
    }
    return (
        <>
            <Link to="/post-rant">Post a Rant</Link>

            {postList.map((post) => {
                return (
                    <div className="post-container">
                        <h1>{post.title}</h1>
                        <p>{post.rantPost}</p>
                        <img src={post.pfpURL}/>
                        <h3>@ {post.author_name}</h3>
                        {isAuthorized && localStorage.getItem('uID') === auth.currentUser.uid && <button onClick={() => {deletePost(post.id)}}>X</button>}
                    </div>
                )
            })}
        </>
    );
}

export default Rant;