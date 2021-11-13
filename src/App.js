import React from 'react';
import {auth, db} from './context/firebase'
import {collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore'
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
  await addDoc(collectionRef, {
    text:newMessage,
    createdAt:new Date(),
    displayName,
    uid
  });
  setNewMessage('');
  dummy.current.scrollIntoView({behavior:"smooth"});
}
const [messages, setMessages] = React.useState([])

React.useEffect(() => {
     const getMessage = async () => {
      const data = await getDocs(collectionRef, orderBy('createdAt', 'asc', limit(25)));
      setMessages(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
     }
     getMessage();
},[])

console.log(messages);



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
 const {text} = message.value
 const {displayName, uid} = auth.currentUser
 const messageCLass = uid !== auth.currentUser.uid ? 'received' : 'sent';
  return (

      <article className={`message ${messageCLass}`}>
      <h1 className="userName">{displayName}</h1>
      <span >{text}</span>
    </article>
  )
}
export default App;
