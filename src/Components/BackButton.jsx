import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <Link to='/dashboard'>
            <i className='previousBtn'>
                <IoArrowBackCircleSharp />
            </i>
        </Link>
    );
};

export default BackButton;
