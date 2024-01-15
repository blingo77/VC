import { Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config/firebase";
import { useEffect, useState } from "react";
import '../Rant-Review-Styles/Rant-Review.css'
import PostLogo from '../../images/circle-plus-solid.svg'
import Loading from "../../loading/Loading";

const Rant = ({ isAuthorized }) => {

    const [loading, setLoading] = useState(true)
    const [postList, setPostList] = useState([])
    const postsCollectionRef = collection(db, 'rantPosts')

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef)
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }
        getPosts()
    }, [])

    const deletePost = async (id) => {
        const postDoc = doc(db, 'rantPosts', id)
        await deleteDoc(postDoc)
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
                                    {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}>X</button>}
                                </div>
                            </div>
                            <h4>{post.subject}</h4>
                            <p>{post.rantPost}</p>
                            <h3>@{post.author_name}</h3>

                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Rant;