'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "@/utility/axios";
import { useRouter } from "next/navigation";
import { deleteAllCookies } from "@/utility/cookie";

interface ErrorState {
    isError: boolean;
    error: string
}

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFieldValidation, setFieldValidation] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<ErrorState>({
        isError: false,
        error: ''
    });
    const router = useRouter();

    const handleLoginClick = async () => {
        if (email && password) {
            try {
                await axiosInstance.post('/login', { email, password }, { withCredentials: true });
                router.push('/dashboard');
            } catch (error: any) {
                const response = await error.response.data;
                setErrorState({
                    isError: true,
                    error: response.error,
                });
            }
        } else {
            setFieldValidation(true);
        }
    };

    useEffect(() => {
        deleteAllCookies();
    }, []);

    return <div className="login-container">
        <div className="login-container-image">
            <Image
                src="/welcome-image.jpeg"
                alt="Picture of the author"
                width={0}
                height={0}
                sizes="100vh"
                className="login-stock-image"
            />
        </div>
        <div className="login-container-form">
            <div className="login-container-content-1">
                <div className="login-text">Log In</div>
                <input
                    className="login-input-box"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                        setFieldValidation(false);
                        setEmail(e.target.value);
                        setErrorState({
                            isError: false,
                            error: ''
                        });
                    }
                    }
                />
                <input
                    className="login-input-box"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setFieldValidation(false);
                        setPassword(e.target.value);
                        setErrorState({
                            isError: false,
                            error: ''
                        });
                    }
                    }
                />
                {
                    isFieldValidation && <div className="login-error-text">Please enter all required fields</div>
                }
                {
                    errorState.isError && <div className="login-error-text">{errorState.error}</div>
                }
                <button className="login-button" onClick={handleLoginClick}>Log In</button>
                <div className="login-text-1">If you dont have account then, Click on below sign up link</div>
                <button className="sign-button" onClick={() => router.push('/signup')}>Sign Up</button>
            </div>
        </div>
    </div>
};

export default Login;