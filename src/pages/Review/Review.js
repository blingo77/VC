import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import PostLogo from '../../images/circle-plus-solid.svg'

const Reviews = ({ isAuthorized }) => {

    const [postList, setPostList] = useState([])
    const postsCollectionRef = collection(db, 'reviewPosts')

    useEffect(() => {
        const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) =>{
            setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
        })

        return () => unsubscribe()
    }, [])

    const deletePost = async (id) => {
        const postDoc = doc(db, 'reviewPosts', id)
        await deleteDoc(postDoc)
    }

    return (

        <>

            <div className="post-rant">
                <Link to="/post-review" ><img src={PostLogo}></img></Link>
            </div>

            <div className="rant-review-page-container">

            {postList.map((post) => {
                return (
                    <div className="post-container">
                        <div className="post-header">
                            <div className="pfp">
                                <img src={post.pfpURL} />
                            </div>
                            <div className="title">
                                <h1>{post.title}</h1>
                            </div>
                            <div className="delete">
                                {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}>X</button>}
                            </div>
                        </div>
                        <h2>{post.rateVal}/10</h2>
                        <p>{post.post}</p>
                        <h3>@{post.author.name}</h3>
                    </div>
                )
            })}
            </div>

        </>
    );
}

export default Reviews;