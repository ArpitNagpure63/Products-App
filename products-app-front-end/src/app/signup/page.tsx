'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/utility/axios";
import { deleteAllCookies } from "@/utility/cookie";

interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
}

interface ErrorState {
    isError: boolean;
    error: string
}

const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: 0,
        email: '',
        password: ''
    });
    const [errorState, setErrorState] = useState<ErrorState>({
        isError: false,
        error: ''
    });
    const [isFieldValidation, setFieldValidation] = useState<boolean>(false);
    const router = useRouter();

    const handleInputChnage = (value: string | number, field: string) => {
        const newFormData: any = { ...formData };
        newFormData[field] = value;
        setFormData(newFormData);
        setErrorState({
            isError: false,
            error: ''
        })
    };

    const handleSignUpClick = async () => {
        if (formData.name && formData.age && formData.email && formData.password) {
            setFieldValidation(false);
            try {
                await axiosInstance.post('/signup', formData, { withCredentials: true });
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
                src="/signup-image.jpeg"
                alt="Picture of the author"
                width={0}
                height={0}
                sizes="100vh"
                className="login-stock-image"
            />
        </div>
        <div className="signup-container-form">
            <div className="login-container-content-1">
                <div className="login-text">Sign Up</div>
                <input
                    className="login-input-box"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChnage(e.target.value, 'name')}
                />
                <input
                    className="login-input-box"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => handleInputChnage(e.target.value, 'age')}
                />
                <input
                    className="login-input-box"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChnage(e.target.value, 'email')}
                />
                <input
                    className="login-input-box"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChnage(e.target.value, 'password')}
                />
                {
                    isFieldValidation && <div className="login-error-text">Please enter all required fields</div>
                }
                {
                    errorState.isError && <div className="login-error-text">{errorState.error}</div>
                }
                <button className="login-button" onClick={handleSignUpClick}>Sign Up</button>
            </div>
        </div>
    </div>
};

export default Signup;