import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import PostLogo from '../../images/circle-plus-solid.svg'
import TrashIcon from '../../images/trash-solid.svg'
import Loading from "../../loading/Loading";

const Reviews = ({ isAuthorized }) => {

    const [postList, setPostList] = useState([])
    const [loading, setLoading] = useState(true)
    const postsCollectionRef = collection(db, 'reviewPosts')

    // Queries
    const q = query(postsCollectionRef, orderBy('time', 'desc'))

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) =>{
            setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            setLoading(false)
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

            { loading ? <Loading /> : postList.map((post) => {
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
                                {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}><img src={TrashIcon}/></button>}
                            </div>
                        </div>
                        <h2>{post.rateVal}/10</h2>
                        <p>{post.post}</p>
                        <h5>{post.date}</h5>
                        <h3>@{post.author.name}</h3>
                    </div>
                )
            })}
            </div>

        </>
    );
}

export default Reviews;