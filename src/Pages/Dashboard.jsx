import Tickets from "../Components/Tickets";
import useFetchFirebase from "../Hooks/useFetchFirebase";
import { useContext } from "react";
import { LoginContext } from "../Helper/Context";
import Stats from "../Components/Stats";

const Dashboard = () => {
    const { loggedIn } = useContext(LoginContext);
    const { data: tickets, isLoading, error } = useFetchFirebase();

    return (
        <div className='page '>
            <div className='pageHeader'>
                <div>
                    <h3 className='welcomeMessage'>
                        {"Hi "}
                        <span className='greeting'>{loggedIn.displayName}</span>
                    </h3>
                    <h1 className='welcomeMessage'>Welcome back</h1>
                </div>
            </div>

            <div className='dashboard'>
                {error && <p>{error}</p>}
                {isLoading && <div id='loadingWheel'></div>}
                <Tickets tickets={tickets} />
                <Stats tickets={tickets} />
            </div>
        </div>
    );
};

export default Dashboard;
