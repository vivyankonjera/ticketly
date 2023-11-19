import { auth, provider } from "../Config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoginContext } from "../Helper/Context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { loggedIn } = useContext(LoginContext);

    const loginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (e) {
            console.error(e);
        }
    };

    const loginWithGoogle = async () => {
        const res = await signInWithPopup(auth, provider);
        const authInfoGoogle = {
            userID: res.user.uid,
            username: res.user.displayName,
            displayImage: res.user.photoURL,
            isLoggedIn: true,
        };
        // console.log(res)
        localStorage.setItem("auth", JSON.stringify(authInfoGoogle));
        navigate("/dashboard");
    };

    if (loggedIn) {
        return <Navigate to='dashboard' />;
    } else {
        return (
            <div className='loginPage'>
                <h1 className='appName'>Ticketly</h1>
                <div className='authWrapper'>
                    <h1>Login</h1>
                    <form onSubmit={loginWithEmail}>
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

                        <button id='loginBtn'>Login</button>
                        <p>
                            Don't have an account?{" "}
                            <Link id='signUpBtn' to='/SignUp'>
                                Sign up
                            </Link>
                        </p>
                    </form>
                    <button id='googleLogin' onClick={loginWithGoogle}>
                        Login with Google <FcGoogle />
                    </button>
                </div>
            </div>
        );
    }
};

export default Login;
