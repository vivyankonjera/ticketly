import "./Styles/App.css";
import RootLayout from "./Pages/Layouts/Rootlayout";
import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import TicketDetails from "./Pages/TicketDetails";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import NewTicket from "./Pages/NewTicket";
import ProtectedRoute from "./Components/ProtectedRoute";
import { auth } from "./Config/firebase";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { LoginContext } from "./Helper/Context";
import { useState } from "react";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<Login />} />
            <Route path='SignUp' element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
                <Route path='Dashboard' element={<Dashboard />} />
                <Route path='settings' element={<Settings />} />
                <Route path='profile' element={<Profile />} />
                <Route path='new-ticket' element={<NewTicket />} />
                <Route
                    path='dashboard/ticket/:id'
                    element={<TicketDetails />}
                />
            </Route>
        </Route>
    )
);

function App() {
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(user);
            }
        });
    }, [loggedIn]);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <RouterProvider router={router} />
        </LoginContext.Provider>
    );
}

export default App;
