import { Link, useNavigate } from "react-router-dom";
import { getDocs, getDoc, collection, deleteDoc, doc, onSnapshot, query, orderBy, updateDoc, increment, FieldValue, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../../firebase-config/firebase";
import { useEffect, useState,  } from "react";
import '../Rant-Review.css'
import PostLogo from '../../../images/circle-plus-solid.svg'
import TrashIcon from '../../../images/trash-solid.svg'
import Loading from "../../../loading/Loading";
import likeButtonImg from '../../../images/heart.png'

const Rant = ({ isAuthorized }) => {

    const naviagte = useNavigate()

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

        getLikedId(id)

        if(!isAuthorized){
            naviagte('/login')
        }
        else{

            const docRef = doc(db, 'rantPosts', id)

            updateDoc(docRef, {
                like: increment(1),
                likedBy: arrayUnion(auth.currentUser.uid)
            })
            .then(() => {
                console.log('Liked')
            })
        }

    }

    const getLikedId = (id) =>{

        const docRef = doc(db, 'rantPosts', id)

        getDoc(docRef)
        .then((docSnapshot) => {
            if(docSnapshot.exists){

                const data = docSnapshot.data()
                
                console.log(data)
                const array = []
                data.likedBy.forEach(likedByID => {
                    if(auth.currentUser.uid === likedByID){
                        document.getElementById(`post-${id}`).disabled = true
                    }
                })

            }else{
                console.log('Does Not exist')
            }
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
                            <button onClick={()=> {addLikes(post.id)}} id={`post-${post.id}`} className="like-button"><img src={likeButtonImg}/></button>
                            <h3>@{post.author.name}</h3>

                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Rant;