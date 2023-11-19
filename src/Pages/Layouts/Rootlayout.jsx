import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className='rootLayout'>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;
