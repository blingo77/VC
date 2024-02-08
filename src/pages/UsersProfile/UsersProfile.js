import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config/firebase";
import { useEffect, useState } from "react";
import TrashIcon from "../../images/trash-solid.svg";
import './UsersProfile.css'
import SideProfBar from "./SideProfBar";

/*
 Users profile page to display all the users posts.

 - Logic for retrieving posts will be moved to a file to store users post
*/

const UserProfile = ({ isAuthorized }) => {

    // Users ID
    const { id } = useParams()

    //Navigate for redirection to new pages
    const navigate = useNavigate()

    const [pfp, setPfp] = useState('')

    // Arrays to hold users posts, map through them to get
    const [userRantPostList, setUserPostList] = useState([])
    const [userReviewPostList, setUserReviewPostList] = useState([])


    // states for the filter button
    const [filterPosts, setFilterPosts] = useState(true)
    const [filterButtonText, setFilterButtonText] = useState('Rants')

    // Database collections references
    const userRantPostCollectionRef = collection(db, 'rantPosts')
    const userReviewPostCollectionRef = collection(db, 'reviewPosts')

    //Make query for rant posts
    const rantQ = query(userRantPostCollectionRef, where('author.id', '==', id))
    const reviewQ = query(userReviewPostCollectionRef, where('author.id', '==', id))

    // Grabs users rant posts - will be moved to new file
    useEffect(() => {
        const unsubscribe = onSnapshot(rantQ, (snapShot) => {
            setUserPostList(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })

        return () => unsubscribe()

    }, [])

    // Grabs users review posts - will be moved
    useEffect(() => {
        const unsubscribe2 = onSnapshot(reviewQ, (snapShot) => {
            setUserReviewPostList(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })

        return () => unsubscribe2()

    }, [])

    // Deletes users posts
    const deletePost = async (id) => {
        const postDoc = doc(db, "rantPosts", id);
        await deleteDoc(postDoc);
    };

    //Handles if the post was posted Anonymously
    if(id == 'anon'){
        navigate('/rants')
    }

    return (
        <div className="user-prof-main-container">
            <div className="side-prof-container">
                <SideProfBar pfp={pfp}></SideProfBar>
            </div>
            <div className="rant-review-page-container">

                {/* filter button */}
                <div className="filter-btn-container">
                <button id="postFilter" onClick={() => {
                    if (filterPosts == false) {
                        setFilterPosts(true)
                        setFilterButtonText('Reviews')
                    }
                    else {
                        setFilterPosts(false)
                        setFilterButtonText('Rants')
                    }
                }}> {filterButtonText}</button>
                </div>

                {/* Ternary operator to switch between rants and reviews based on state 'filterPosts' */}
                {!filterPosts ?

                    // Displays users review posts
                    userReviewPostList.map((post) => {
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
                                        {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}><img src={TrashIcon} /></button>}
                                    </div>
                                </div>
                                <h2>{post.rateVal}/10</h2>
                                <p>{post.post}</p>
                                <h5>{post.date}</h5>
                                <h3>@{post.author.name}</h3>
                            </div>
                        )
                    })
                    :
                    // Displays users rant posts
                    userRantPostList.map((post) => {
                        return (
                            <>
                                <div className="post-container">
                                    <div className="post-header">
                                        <div className="pfp">
                                            <img src={post.pfpURL} />
                                        </div>
                                        <div className="title">
                                            <h1>{post.title}</h1>
                                        </div>
                                        <div className="delete">
                                            {isAuthorized &&
                                                post.author.id === auth.currentUser.uid && (
                                                    <button
                                                        onClick={() => {
                                                            deletePost(post.id);
                                                        }}
                                                    >
                                                        <img src={TrashIcon} />
                                                    </button>
                                                )}
                                        </div>
                                    </div>

                                    <h4>{post.subject}</h4>

                                    <div className="post-body-container">
                                        <Link to={`/rant/${post.id}`}>
                                            <p>{post.rantPost}</p>
                                        </Link>
                                    </div>

                                    <div className="post-info-container">
                                        <div className="post-date-container">
                                            <h5>{post.date}</h5>
                                        </div>

                                        <p className="likes">{post.like} Likes</p>

                                        <div>
                                            <h3>@{post.author.name}</h3>
                                        </div>
                                    </div>

                                </div>

                            </>)

                    })}
            </div>
        </div>
    );
}

export default UserProfile;