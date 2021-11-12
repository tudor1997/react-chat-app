import React from 'react';
import {auth, db} from './context/firebase'
import {collection, getDocs, addDoc} from 'firebase/firestore'
import {FcVoicePresentation} from 'react-icons/fc'
// firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth'


// components

import {SignIn} from './SignIn';
import {SignOut} from './SignIn';


function App() {
  const [messages, setMessages] = React.useState([]);
  const collectionRef = collection(db, "messages")
  React.useEffect(() => {
      const getMessages = async () => {
        const data = await getDocs(collectionRef);
        setMessages(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }
      getMessages()
  }, [])
  const [user] = useAuthState(auth);
  return (
    
    <div className="app">
      <header>


      </header>

      <section>
        {user ? <ChatRoom messages={messages} /> : <SignIn />}
      </section>
    </div>
  
    
  );
}
function ChatRoom({messages}) {
const [newMessage, setNewMessage] = React.useState('');
const {displayName, uid} = auth.currentUser
const collectionRef = collection(db, "messages")
const setMessage = async (e) => {
  e.preventDefault();
  await addDoc(collectionRef, {
    text:newMessage,
    createdAt:new Date(),
    displayName,
    uid
  });
  setNewMessage('');
}
  return ( <div className="container">
    {messages.map((message) => {
      return <ChatMessage key={message.id} value={message}></ChatMessage>
    })}

        <form onSubmit={setMessage}>
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
          <button type="submit" ><FcVoicePresentation/></button>
        </form>
      <SignOut/>
  
  </div>

  
  )
}

function ChatMessage(message){
 const {text} = message.value
 const {displayName, uid} = auth.currentUser
 const messageCLass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
      <article className={`message ${messageCLass}`}>
      
        <h1>{displayName}</h1>
        <p>{text}</p>
      </article>
  )
}
export default App;
