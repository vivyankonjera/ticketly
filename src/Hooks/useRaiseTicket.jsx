import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./Config/firebase";

const useRaiseTicket = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "tickets"), {
                name: ticketName,
                errorMsg: ticketErrorMessage,
                platform: platform,
                user: user,
                state: "open",
                raised: serverTimestamp(),
            });
            redirect(-1);
        } catch (e) {
            console.error(e);
        }
    };

    return handleSubmit;
};

export default useRaiseTicket;
