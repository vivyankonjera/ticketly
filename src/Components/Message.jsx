import { auth } from "../Config/firebase";

const Message = ({ message }) => {
    return (
        <div
            className={`chatBubble ${
                message.uid === auth.currentUser.uid ? "right" : "left"
            }`}
        >
            {message.avatar && (
                <img
                    className='chatDp'
                    src={message.avatar}
                    // alt='user avatar'
                />
            )}

            {!message.avatar && (
                <div className=' altChatdp'>{message.name.charAt(0)}</div>
            )}

            <div className='chatContent'>
                <p className='userName'>{message.name}</p>
                <p className='userMessage'>{message.text}</p>
            </div>
        </div>
    );
};

export default Message;
