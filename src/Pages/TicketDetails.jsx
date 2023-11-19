import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useEffect, useState } from "react";
import Messages from "../Components/Messages";
import BackButton from "../Components/BackButton";
import { storage } from "../Config/firebase";
import {
    Ref,
    getDownloadURL,
    listAll,
    ref,
    uploadBytes,
} from "firebase/storage";
import ImageModal from "../Components/ImageModal";

const TicketDetails = () => {
    const { id } = useParams();
    const [ticketList, setTicketList] = useState("");
    const [imageUpload, setImageUpload] = useState([]);
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, `ticketImages/${id}/`);
    const [modal, setModal] = useState();
    const [modalImage, setModalImage] = useState();
    // const { data: ticket, isLoading, error } = useFetchFirebase();
    // const {error, isLoading, data: ticket} = useFetch("http://localhost:3001/tickets/"+id);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const docRef = doc(db, "tickets", id);
                const docSnap = await getDoc(docRef);
                setTicketList(docSnap.data());
            } catch (e) {
                console.log(e);
            }
        };
        getDetails();
        getImages();
    }, []);

    const getImages = () => {
        listAll(imageListRef).then((res) => {
            console.log(res);
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    };

    const uploadImages = () => {
        if (!imageUpload) return;

        for (var key in imageUpload) {
            if (imageUpload.hasOwnProperty(key)) {
                let imageRef = ref(
                    storage,
                    `ticketImages/${id}/${imageUpload[key].name}`
                );
                uploadBytes(imageRef, imageUpload[key]).then(() => {
                    console.log(imageUpload[key]);
                    console.log("Image uploaded");
                });
            }
        }

        getImages();
    };

    const toggleImageModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <div className='ticketDetails page'>
                {/*  {isLoading && <div id="loadingWheel"></div>} 
            {error && (<h2>{error}</h2>)} */}
                <BackButton />
                <div className='pageContent'>
                    <div className='ticketInfo'>
                        <div className='ticketBorder'></div>
                        <h3 className='ticketRef'>Ticket Ref - {id}</h3>
                        <p>
                            <span className='infoKey'>Ticket Name: </span>
                            {ticketList.name}
                        </p>
                        <p>
                            <span className='infoKey'>Error Message: </span>
                            {ticketList.errorMsg}
                        </p>
                        <p>
                            <span className='infoKey'>Platform: </span>
                            {ticketList.platform}
                        </p>
                        <p>
                            <span className='infoKey'>State: </span>
                            {ticketList.state}
                        </p>
                        <p>
                            <span className='infoKey'>Date: </span>
                            {ticketList.raised?.toDate().toDateString()}
                        </p>
                        <p>
                            <span className='infoKey'>Time: </span>
                            {ticketList.raised?.toDate().toLocaleTimeString()}
                        </p>

                        <h3 className='attachmentsLabel'>Attachments</h3>

                        <div className='ticketImages'>
                            {" "}
                            {imageList.map((url) => {
                                return (
                                    <img
                                        className='ticketImage'
                                        src={url}
                                        alt=''
                                        onClick={() => {
                                            setModalImage(url);
                                            toggleImageModal();
                                        }}
                                    />
                                );
                            })}
                        </div>

                        <div className='attachments'>
                            <input
                                className='fileUpload'
                                type='file'
                                multiple='multiple'
                                accept='.jpg,.jpeg,.png'
                                onChange={(e) => {
                                    setImageUpload(e.target.files);
                                }}
                            />
                            <button onClick={uploadImages}>Upload</button>
                        </div>

                        <button className='resolvedBtn'>
                            Mark as resolved
                        </button>
                    </div>
                    <Messages ticketID={id} />
                </div>
            </div>
            {modal && (
                <ImageModal
                    toggleImageModal={toggleImageModal}
                    url={modalImage}
                />
            )}
        </>
    );
};

export default TicketDetails;
