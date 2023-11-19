import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const SignUpWithEmail = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: displayName });
            console.log(auth.currentUser);
            navigate("/Dashboard");
        } catch (e) {
            console.error(e.message);
        }
    };

    return (
        <div className='signUpPage'>
            <h1 className='appName'>Ticketly</h1>
            <div className='authWrapper'>
                <h1 id='signUpHeading'>Sign Up</h1>
                <form onSubmit={SignUpWithEmail}>
                    <label>Account Name</label>
                    <input
                        className='formRow'
                        type='text'
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        className='formRow'
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password </label>
                    <input
                        className='formRow'
                        type='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button id='loginBtn'>Sign up</button>
                    <p>
                        Already have an account?{" "}
                        <Link id='signUpBtn' to='/'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
