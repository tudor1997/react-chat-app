import React from 'react';
import {auth, db} from './context/firebase'
import {collection, getDocs, setDoc, query, orderBy, limit,doc,serverTimestamp ,onSnapshot } from 'firebase/firestore'
import {FcVoicePresentation} from 'react-icons/fc'
// firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

// components

import {SignIn} from './SignIn';
import {SignOut} from './SignIn';



function App() {
 


  const [user] = useAuthState(auth);
  return (
    
    <div className="app">
      <article className="chat-card">
      <header>
        <h2>Chat room</h2>
        <SignOut/>
      </header>

      <section className="chat-content">
        {user ? <ChatRoom /> : <SignIn />}
      </section>
      </article>
  
    </div>
  
    
  );
}
function ChatRoom() {
const [newMessage, setNewMessage] = React.useState('');
const {displayName, uid} = auth.currentUser
const collectionRef = collection(db, "messages")
const dummy = React.useRef();
const setMessage = async (e) => {
  e.preventDefault();
  if(newMessage && newMessage !== "") {
 const newMessageRef = doc(collectionRef);
  await setDoc(newMessageRef, {
    text:newMessage,
    createdAt:serverTimestamp(),
    displayName,
    uid
  });
  }
  setNewMessage('');
  dummy.current.scrollIntoView({behavior:"smooth"});
}
const [messages, setMessages] = React.useState([])

React.useEffect(() => {
     const q = query(collectionRef, orderBy('createdAt', 'asc'))
      const unsub =  onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));

        return unsub
      });
      
     
  
},[])





;
  return ( <div className="container">
    <div className="messages-list">
    
    {messages.map((message) => {
      return <ChatMessage key={message.id} value={message}></ChatMessage>
    })}
      <div ref={dummy}></div>
    </div>


        <form className="form-message" onSubmit={setMessage}>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
          <button type="submit" ><FcVoicePresentation/></button>
        </form>
     
  
  </div>

  
  )
}

function ChatMessage(message){
  
 const {text, uid, displayName} = message.value
 
 const messageCLass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (

      <article className={`message ${messageCLass}`}>
      <h1 className="userName">{displayName}</h1>
      <span >{text}</span>
    </article>
  )
}
export default App;
