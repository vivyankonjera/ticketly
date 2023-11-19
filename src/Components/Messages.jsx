import SendMessage from "./SendMessage";
import Message from "./Message";
import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    limit,
    where,
} from "firebase/firestore";

import { db } from "../Config/firebase";

const Messages = ({ ticketID }) => {
    const [message, setMessages] = useState();

    useEffect(() => {
        const q = query(
            collection(db, "tickets", ticketID, "messages"),
            where("ticketID", "==", ticketID),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const filteredData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            const sortedMessages = filteredData.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    return (
        <div className='messages'>
            <div className='messages-wrapper'>
                {message?.map((message) => (
                    <Message key={message.id} message={message} />
                ))}

                {message == "" && <p id='noMessagePrompt'>No messages</p>}
            </div>
            <SendMessage ticketID={ticketID} />
        </div>
    );
};

export default Messages;
