import React, { useEffect, useState } from 'react'

import {
    BookmarkIcon,
    EmojiHappyIcon,
    ChatIcon,
    DotsHorizontalIcon,
    PaperAirplaneIcon,
    HeartIcon,

} from "@heroicons/react/outline"

import {HeartIcon as HeartIconFilled} from "@heroicons/react/solid"
import { useSession } from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({ id, username, userImg, img, caption}) {
    const {data: session} = useSession()
    const [comment, setcomment] = useState("")
    const [comments, setcomments] = useState([])
    const [likes, setlikes] = useState([])
    const [hasliked, sethasliked] = useState(false)

    useEffect(() => 
         onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
        (snapshot) => {
            setcomments(snapshot.docs)
        }
    ), [db, id])  

    useEffect(() => 
         onSnapshot(query(collection(db, "posts", id, "likes")),
        (snapshot) => {
            setlikes(snapshot.docs)
        }
    ), [db, id])

    useEffect( () => 
        sethasliked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1)
    , [likes] )

    const likepost = async ( ) => {
        if(hasliked) {
            await deleteDoc(doc(db, 'posts', id, "likes", session.user.uid))
        } else{
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username
            })
        }
        
    }
    
    const sendComment = async  (e ) => {
        e.preventDefault()

        const commentToSend = comment;
        setcomment("") 
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username, 
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });

    }
    return (
        <div className="bg-white my-7 border rounded-sm">
            

            {/*Header*/}
                <div className="flex items-center p-5">
                    <img src = {userImg} className="rounded-full h-12 w-12 object-contain p-1 mr-3" alt = "" />
                    <p className="flex-1 font-bold">{username}</p>
                    <DotsHorizontalIcon className="h-5" />
                </div>
            {/*img*/}
                <img src ={img} className="object-cover w-full"/>
            {/*Buttons*/}
            {session && (
                <div className="flex justify-between px-4 pt-4">
                <div className ="flex space-x-4">
                    {hasliked ? (<HeartIconFilled onClick= {likepost} className="btn text-red-600" />):
                    (<HeartIcon
                    onClick= {likepost} className= "btn" />)}
                    <ChatIcon className= "btn" />
                    <PaperAirplaneIcon className= "btn" />
                </div>
                <BookmarkIcon className="btn" />
                </div>
            )}
                
            {/*caption*/}
                <p className="p-5 truncate">
                    {likes.length > 0 && (
                        <p className="font-bold mb-1">{ likes.length} likes</p>
                    )}
                    <span className="font-bold mr-1">{ username}</span>
                    {caption}
                </p>
            {/*comment*/}
            {comments.length > 0 && (
                <div className= "ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map( (comment) => (
                        <div key = {comment.id} className= "flex items-center space-x-2 mb-3">
                            <img className='h-7 rounded-full' src ={comment.data().userImage} alt = "" />
                            <p className="text-sm flex-1"> 
                            <span className="font-bold">
                                {comment.data().username}
                            </span> {" "}
                            {comment.data().comment}</p>
                            <Moment className="pr-5 text-xs " fromNow >
                                {comment.data().timestamp?.toDate()}
                            </Moment>

                            
                        </div>
                    ))}
                </div>
            )}
            {/*Header*/}
            {/*input box*/}
            {session && (
              <form className="flex items-center p-4">
                <EmojiHappyIcon className="h-7" />
                <input 
                value = {comment} 
                onChange={e => setcomment(e.target.value)} 
                placeholder="Add a comment ..." 
                className="border-none flex-1 focus:ring-0 outline-none" type ="text" />
                <button
                 type = "submit"
                 disabled= {!comment.trim}
                 onClick = {sendComment}
                 className="font-semibold text-blue-400">Post</button>
               </form>
            )}
            

        </div>
    )
}

export default Post
