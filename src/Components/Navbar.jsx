import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "../Helper/Context";
import { AiFillHome } from "react-icons/ai";
import { MdSettings } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { BiSolidLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [activeNav, setActiveNav] = useState("home");
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            console.log("sign out successful");
            setLoggedIn(null);
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <nav className='navbar'>
            <h1 className='appName'>Ticketly</h1>
            <div className='Links'>
                <Link
                    className={
                        activeNav === "home" ? "navLink activeNav" : "navLink"
                    }
                    to='/dashboard'
                    title='Home'
                    onClick={() => {
                        setActiveNav("home");
                    }}
                >
                    <AiFillHome />
                    <span className='navLinkTitle'>Home</span>
                </Link>
                <Link
                    className={
                        activeNav === "newTicket"
                            ? "navLink activeNav"
                            : "navLink"
                    }
                    to='/new-ticket'
                    title='New ticket'
                    onClick={() => {
                        setActiveNav("newTicket");
                    }}
                >
                    <BiSolidAddToQueue />{" "}
                    <span className='navLinkTitle'>New ticket</span>
                </Link>
                <Link
                    to='Profile'
                    className={
                        activeNav === "profile"
                            ? "navLink activeNav"
                            : "navLink"
                    }
                    onClick={() => {
                        setActiveNav("profile");
                    }}
                    title='Profile'
                >
                    <FaUserCircle />{" "}
                    <span className='navLinkTitle'>Profile</span>
                </Link>
                <Link
                    className={
                        activeNav === "settings"
                            ? "navLink activeNav"
                            : "navLink"
                    }
                    to='/settings'
                    title='Settings'
                    onClick={() => {
                        setActiveNav("settings");
                    }}
                >
                    <MdSettings />{" "}
                    <span className='navLinkTitle'>Settings</span>
                </Link>
            </div>

            <div className='navProfileLink'>
                <img
                    className='appLogo '
                    src={require("../images/logo.png")}
                    alt=''
                />
                <p id='displayName'>Helpdesk System</p>
                <Link className='navLink' onClick={logout} title='Logout'>
                    <BiSolidLogOut />{" "}
                    <span className='navLinkTitle'>Sign out</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
