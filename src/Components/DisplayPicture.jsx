import { LoginContext } from "../Helper/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsSharp } from "react-icons/io5";

const DisplayPicture = () => {
    const { loggedIn } = useContext(LoginContext);
    return (
        <div className='topRightHeader'>
            <p>{loggedIn?.email}</p>
            <IoNotificationsSharp className='notificationIcon' />
            <Link to='Profile'>
                {loggedIn.photoURL && (
                    <img
                        className='displayPicture'
                        src={loggedIn?.photoURL}
                        alt=''
                    />
                )}

                {!loggedIn.photoURL && (
                    <div className='altDisplayPicture'>
                        {loggedIn.displayName.charAt(0)}
                    </div>
                )}
            </Link>
        </div>
    );
};

export default DisplayPicture;
