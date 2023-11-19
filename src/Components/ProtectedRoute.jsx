import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { LoginContext } from "../Helper/Context";
import { useContext } from "react";
import DisplayPicture from "./DisplayPicture";

const ProtectedRoute = ({ redirectPath = "/" }) => {
    const { loggedIn } = useContext(LoginContext);

    if (!loggedIn) {
        return <Navigate to={redirectPath} replace />;
    } else {
        return (
            <div className='mainLayout'>
                <Navbar />
                <DisplayPicture />
                <Outlet />
            </div>
        );
    }
};

export default ProtectedRoute;
