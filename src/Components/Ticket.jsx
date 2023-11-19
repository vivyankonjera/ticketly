import { Link } from "react-router-dom";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";

const Ticket = ({ tickets, state }) => {
    return (
        <>
            {tickets
                .filter((ticket) => {
                    if (state) {
                        return ticket.state == state;
                    } else {
                        return ticket;
                    }
                })
                .map((ticket) => (
                    <Link to={"ticket/" + ticket.id} key={ticket.id}>
                        <div className='ticketPreview'>
                            <div className='ticketPreviewLeft'>
                                {ticket.platform === "squarespace" && (
                                    <img
                                        src='https://yt3.googleusercontent.com/TyYx1KXoYFP3dfR2ZtMw1FWNJtrqSMUQj6VOKQ7XJdYIziKmsCYwQIXjv8GLuGFb64oiGN3CTQ=s900-c-k-c0x00ffffff-no-rj'
                                        alt=''
                                        className='platformImg'
                                    />
                                )}

                                {ticket.platform === "wordpress" && (
                                    <img
                                        src='https://s2.wp.com/wp-content/themes/a8c/supportforums/images/wpcom-logo.png'
                                        alt=''
                                        className='platformImg'
                                    />
                                )}

                                {ticket.platform === "shopify" && (
                                    <img
                                        src='https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png'
                                        alt=''
                                        className='platformImg'
                                    />
                                )}

                                {ticket.platform === "wix" && (
                                    <img
                                        src='https://www.drupal.org/files/project-images/webflow-mark-blue-circle-square.png'
                                        alt=''
                                        className='platformImg'
                                    />
                                )}

                                {ticket.platform !== "squarespace" &&
                                    ticket.platform !== "wix" &&
                                    ticket.platform !== "shopify" &&
                                    ticket.platform !== "wordpress" && (
                                        <img
                                            src='https://i.pinimg.com/736x/86/c3/05/86c30529904c3a992eb7241299e5f3e5.jpg'
                                            alt=''
                                            className='platformImg'
                                        />
                                    )}

                                {ticket.priority === "p3 - high" && (
                                    <FcHighPriority />
                                )}
                                {ticket.priority === "p2 - medium" && (
                                    <FcMediumPriority />
                                )}
                                {ticket.priority === "p1 - low" && (
                                    <FcLowPriority />
                                )}

                                <div className='ticketPreviewDetails'>
                                    <h5 className='ticketName'>
                                        {ticket.name.length > 30
                                            ? `${ticket.name.substr(0, 30)}...`
                                            : ticket.name}
                                    </h5>
                                    <p className='ticketPlatform'>
                                        {ticket.platform}
                                    </p>
                                    <p className='ticketState'>
                                        {ticket.state}
                                    </p>
                                </div>
                            </div>

                            <div className='ticketTimestamp'>
                                {ticket.raised && (
                                    <div>
                                        <p className='raisedDate'>
                                            {ticket.raised
                                                .toDate()
                                                .toDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
        </>
    );
};

export default Ticket;
