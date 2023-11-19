import BackButton from "../Components/BackButton";
import { useContext } from "react";
import { LoginContext } from "../Helper/Context";

const Profile = () => {
    const { loggedIn } = useContext(LoginContext);
    return (
        <div className='myProfile page'>
            <BackButton />
            <div className='pageContent'>
                <div className='ticketBorder'></div>
                <form className='newTicketForm'>
                    <h2 className='myProfileLabel'>My Profile</h2>

                    <div className='myProfileContent'>
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

                        <input
                            className='newTicketFormRow'
                            placeholder={loggedIn.displayName}
                            type='text'
                            disabled
                        />
                    </div>

                    <div>
                        <input
                            className='newTicketFormRow'
                            placeholder={loggedIn.email}
                            disabled
                        />
                    </div>

                    <button className='createTicketButton formRow'>Edit</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
