import { useState } from "react";
import { auth, db } from "../Config/firebase";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

const SendMessage = ({ ticketID }) => {
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();

        if (message.trim() === "") {
            setMessage("");
            return;
        }

        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "tickets", ticketID, "messages"), {
            text: message,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            ticketID,
            uid,
        });
        setMessage("");
    };

    return (
        <form onSubmit={sendMessage} className='sendMessage'>
            <label htmlFor='messageInput' hidden>
                Enter Message
            </label>
            <input
                id='messageInput'
                name='messageInput'
                type='text'
                autoComplete='off'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='form-input__input'
                placeholder='Type message...'
            />
            <button id='sendButton' type='submit'>
                Send
            </button>
        </form>
    );
};

export default SendMessage;
