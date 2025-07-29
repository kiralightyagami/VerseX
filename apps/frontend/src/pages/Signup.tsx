import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

export const backendUrl = 'http://localhost:3000/'

const formFields = [
    {
        name: 'username',
        placeholder: 'UserName',
        type: 'username',
        validation: {
            required: 'Username is required',
            minLength: {
                value: 3,
                message: 'username be at least 3 characters'
            }
        }
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        validation: {
            required: 'Password is required',
            minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
            }
        }
    }
];

interface FormData {
    [key: string]: string
}

const SignupPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const usernameValue = watch('username');


    useEffect(() => {
        setUsernameError('');
    }, [usernameValue]);


    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendUrl}api/v1/auth/signup`, {
                username: data.username,
                password: data.password,
                type: "user"
            })
            if (response.status == 200) {
                navigate('/')
            }
            localStorage.setItem('token', response.data.token)
        } catch (error: any) {
            if (error.response?.status === 400 && error.response.data?.message === 'Username already exists') {
                setUsernameError('Username already exists');
            } else {
                console.error("Error:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex justify-center overflow-hidden">
            <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-md rounded-lg shadow-2xl px-8 py-4 bg-foreground-300/30">
                    <div className="mb-4 text-center">
                        <h2 className="text-4xl font-bold">Create Account</h2>
                        <p className="text-foreground-100 mt-2">Please enter your details to Create an Account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {formFields.map((field) => (
                            <div key={field.name}>
                                <div className="p-0.5">
                                    <input
                                        {...register(field.name, field.validation)}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="w-full bg-foreground-300/30 p-3.5 rounded-lg border border-foreground-300/40 focus:ring-2 focus:ring-foreground-300/60 focus:outline-hidden"
                                    />
                                </div>
                                {errors[field.name] && (
                                    <div className="text-sm text-red-500 -mb-3 ml-2">
                                        {String(errors[field.name]?.message)}
                                    </div>
                                )}
                                {field.name === 'username' && !errors.username && usernameError && (
                                    <div className="text-sm text-red-500 -mb-3 ml-2">
                                        {usernameError}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className='pt-2'>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary-400 text-foreground-900 hover:bg-primary-600 rounded-lg py-4 font-bold transition-colors cursor-pointer">
                                <span>{isLoading ? 'Sign Up...' : 'Sign Up'}</span>
                            </button>
                        </div>
                    </form>

                    <p className="mt-1 text-center text-sm text-foreground-100">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-primary-400 hover:text-primary-500 font-semibold transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;