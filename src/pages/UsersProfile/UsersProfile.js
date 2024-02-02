import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db, auth } from "../../firebase-config/firebase";
import { useEffect, useState } from "react";
import TrashIcon from "../../images/trash-solid.svg";

const UserProfile = ({isAuthorized}) => {
    
    const {id} = useParams()
    const [userRantPostList, setUserPostList] = useState([])
    const [userReviewPostList, setUserReviewPostList] = useState([])
    const [filterPosts, setFilterPosts] = useState(true)
    const [filterButtonText, setFilterButtonText] = useState('Rants')

    const userRantPostCollectionRef = collection(db, 'rantPosts')
    const userReviewPostCollectionRef = collection(db, 'reviewPosts')

    //Make query for rant posts
    const rantQ = query(userRantPostCollectionRef, where('author.id', '==', id))
    const reviewQ = query(userReviewPostCollectionRef, where('author.id', '==', id))

    useEffect(() => {
        const unsubscribe = onSnapshot(rantQ, (snapShot) => {
            setUserPostList(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(userRantPostList)

        })

        return () => unsubscribe()

    }, [])

    useEffect(() => {
        const unsubscribe2 = onSnapshot(reviewQ, (snapShot) =>{
            setUserReviewPostList(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(userReviewPostList)
        })

        return () => unsubscribe2()
        
    }, [])

    const deletePost = async (id) => {
        const postDoc = doc(db, "rantPosts", id);
        await deleteDoc(postDoc);
      };

    return ( 
        <>
      <div className="rant-review-page-container">

        <button id="postFilter"onClick={() => {
            if(filterPosts == false){
                setFilterPosts(true)
                setFilterButtonText('Reviews')
            }
            else{
                setFilterPosts(false)
                setFilterButtonText('Rants')
            }
        }}> {filterButtonText}</button>

            {!filterPosts ? 
            
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
                                {isAuthorized && post.author.id === auth.currentUser.uid && <button onClick={() => { deletePost(post.id) }}><img src={TrashIcon}/></button>}
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
        </>
     );
}
 
export default UserProfile;