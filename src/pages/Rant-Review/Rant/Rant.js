import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase-config/firebase";
import { useEffect, useState } from "react";
import '../Rant-Review.css'
import PostLogo from '../../../images/circle-plus-solid.svg'
import TrashIcon from '../../../images/trash-solid.svg'
import Loading from "../../../loading/Loading";

const Rant = ({ isAuthorized }) => {

    const [loading, setLoading] = useState(true)
    const [postList, setPostList] = useState([])
    const postsCollectionRef = collection(db, 'rantPosts')

    //Queries
    const q = query(postsCollectionRef, orderBy('time', 'desc'))

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) =>{

            setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
            setLoading(false)
            })
    
        return () => unsubscribe()
    }, [])

    const deletePost = async (id) => {
        const postDoc = doc(db, 'rantPosts', id)
        await deleteDoc(postDoc)
    }

    const addLikes = (id) =>{
        const docRef = doc(db, 'rantPosts', id)

        updateDoc(docRef, {
            like: 1
        })
        .then(() => {
            console.log('Liked')
        })
    }

    return (
        <>
            <div className="post-rant">
                <Link to="/post-rant" ><img src={PostLogo}></img></Link>
            </div>

            <div className="rant-review-page-container">

                {loading ? <Loading /> : postList.map((post) => {
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
                            <h4>{post.subject}</h4>
                            <p>{post.rantPost}</p>
                            <h5>{post.date}</h5>
                            <p>{post.like}</p>
                            <button onClick={()=> addLikes(post.id)}>Like</button>
                            <h3>@{post.author.name}</h3>

                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Rant;