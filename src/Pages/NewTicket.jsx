import { useContext, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Config/firebase";
import { LoginContext } from "../Helper/Context";
import BackButton from "../Components/BackButton";

const NewTicket = () => {
    const [ticketName, setTicketName] = useState("");
    const [ticketErrorMessage, setTicketErrorMessage] = useState();
    const [platform, setPlatform] = useState("");
    const [priority, setPriority] = useState("low");
    const { loggedIn } = useContext(LoginContext);
    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "tickets"), {
                name: ticketName,
                errorMsg: ticketErrorMessage,
                platform: platform,
                user: loggedIn.uid,
                state: "open",
                priority: priority,
                raised: serverTimestamp(),
            });
            redirect(-1);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='raiseTicket page'>
            <BackButton />
            <div className='pageContent'>
                <div className='ticketBorder'></div>
                <form className='newTicketForm' onSubmit={handleSubmit}>
                    <h2>Create a new ticket</h2>

                    <div>
                        <input
                            className='newTicketFormRow'
                            placeholder='Ticket Name'
                            type='text'
                            required
                            value={ticketName}
                            onChange={(e) => setTicketName(e.target.value)}
                        />
                    </div>

                    <div>
                        <textarea
                            className='newTicketFormRow'
                            placeholder='Error Message'
                            required
                            value={ticketErrorMessage}
                            onChange={(e) =>
                                setTicketErrorMessage(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className='platformLabel'>Platform</label>
                        <select
                            className='newTicketFormRow'
                            name='platform'
                            id='platform'
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        >
                            <option value='wordpress'>Wordpress</option>
                            <option value='wix'>Wix</option>
                            <option value='shopfiy'>Shopfiy</option>
                            <option value='squarespace'>Squarespace</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className='priorityLabel'>Priority</label>
                        <select
                            className='newTicketFormRow'
                            name='priority'
                            id='priority'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value='p1 - low'>Low</option>
                            <option value='p2 - medium'>Medium</option>
                            <option value='p3 - high'>High</option>
                        </select>
                    </div>

                    <button className='createTicketButton formRow'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTicket;
