import { useState, useEffect, useContext } from "react";
import { db } from "../Config/firebase";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { LoginContext } from "../Helper/Context";

const useFetchFirebase = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const { loggedIn } = useContext(LoginContext);

    const getTicketList = async () => {
        try {
            const queryAllTickets = query(
                collection(db, "tickets"),
                orderBy("raised", "desc")
            );

            const queryUserTickets = query(
                collection(db, "tickets"),
                where("user", "==", loggedIn.uid),
                orderBy("raised", "desc")
            );

            const parseQueryData = (snapshot) => {
                const filteredData = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setData(filteredData);
            };

            if (loggedIn.uid === "cDqPtpwKAXRoW7821CUzBVrpCzo2") {
                onSnapshot(queryAllTickets, (snapshot) => {
                    parseQueryData(snapshot);
                });
            } else {
                onSnapshot(queryUserTickets, (snapshot) => {
                    parseQueryData(snapshot);
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTicketList();
        setIsLoading(false);
    }, []);

    console.log(data);

    return { data, isLoading, error };
};

export default useFetchFirebase;
