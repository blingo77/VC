import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDoc, collection, deleteDoc, doc, onSnapshot, query, where, orderBy, updateDoc, increment, arrayRemove, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../../firebase-config/firebase";
import PostLogo from '../../../images/circle-plus-solid.svg'
import TrashIcon from '../../../images/trash-solid.svg'
import Loading from "../../../loading/Loading";
import likeButtonImg from "../../../images/heart.png";


const Reviews = ({ isAuthorized }) => {

    const [postList, setPostList] = useState([])
    const [loading, setLoading] = useState(true)
    const postsCollectionRef = collection(db, 'reviewPosts')

    const navigate = useNavigate()

    // Queries
    const q = query(postsCollectionRef, orderBy('time', 'desc'))

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const deletePost = async (id) => {
        const postDoc = doc(db, 'reviewPosts', id)
        await deleteDoc(postDoc)
    }

    // Adds like to a post
    const addLikes = (id) => {
        const docRef = doc(db, 'reviewPosts', id)

        //updates the doc with a like and new liked ID
        updateDoc(docRef, {
            like: increment(1),
            likedBy: arrayUnion(auth.currentUser.uid)
        })
        .then(() => {
            console.log("Added Like")
        })
    }

    const decrementLike = (id) => {
        const docRef = doc(db, 'reviewPosts', id)

        updateDoc(docRef, {
            like: increment(-1),
            likedBy: arrayRemove(auth.currentUser.uid)
        })
        .then(() => {
            console.log('Removed Like')
        })
    }

    // Checks if the user has liked the post before adding a like
    const getIfLiked = (id) => {
        //
        const docRef = doc(db, 'reviewPosts', id)
        let liked = false

        // Checks if user is logged in first
        if (!isAuthorized) {
            navigate('/login')
        }
        else {
            // Gets the post that the user wants to like
            getDoc(docRef).then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const data = docSnapshot.data()
                    
                    // Iterates through the liked ID list and checks if the user has left a like by their uID
                    data.likedBy.forEach((likedByID) => {
                        if (auth.currentUser.uid === likedByID) {
                            liked = true
                        }
                    })

                    // If liked is False, it will call the addLiked func to add a like
                    if(!liked){
                        addLikes(id)
                    }
                    else{
                        // If liked is True, then the like will be removed
                        decrementLike(id)
                        liked = false
                    }
                }
                else{
                    console.log("Doc does not exist")
                }
            })
        }
    }

    return (

        <>

            <div className="post-rant">
                <Link to="/post-review" ><img src={PostLogo}></img></Link>
            </div>

            <div className="rant-review-page-container">

                {loading ? <Loading /> : postList.map((post) => {
                    return (
                        <div className="post-container">
                            <div className="post-header">
                                <div className="pfp">
                                    <Link to={`/profile/${post.author.id}`}>
                                        <img src={post.pfpURL} />
                                    </Link>
                                </div>
                                <div className="title">
                                    <h1>{post.title}</h1>
                                </div>
                                <div className="delete">
                                    {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}><img src={TrashIcon} /></button>}
                                </div>
                            </div>
                            <h2>{post.rateVal}/10</h2>
                            <p>{post.post}</p>
                            <h5>{post.date}</h5>
                            <div className="post-likeBtn-container">
                                <button className="like-button" onClick={() => {
                                    getIfLiked(post.id)
                                }}><img src={likeButtonImg} /></button>
                            </div>
                            <p className="likes">{post.like}</p>
                            <h3>@{post.author.name}</h3>
                        </div>
                    )
                })}
            </div>

        </>
    );
}

export default Reviews;