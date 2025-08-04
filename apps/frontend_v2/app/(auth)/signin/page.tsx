    "use client";
    import React, { useState } from "react";
    import { Label } from "../../components/ui/label";
    import { Input } from "../../components/ui/input";
    import { cn } from "../../lib/utils";
    import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
    } from "@tabler/icons-react";
    import axios from "axios";
    import { useRouter } from "next/navigation";
import Link from "next/link";

    export default function SigninPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(e.target.username.value, e.target.password.value);
        setFormData({
        username: e.target.username.value,
        password: e.target.password.value,
        });
        console.log(formData);
        setIsLoading(true);
        try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/auth/signin`, {
            username: e.target.username.value,
            password: e.target.password.value,
        });
        if (response.status == 200) {
            localStorage.setItem('token', response.data.token)
            setSuccess("Login successful");
            router.push('/');
        }
        } catch (error) {
        setError("Invalid username or password");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="shadow-input mx-auto w-full max-w-md mt-30 rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black ">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome Back!
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Login to continue...
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="projectmayhem" type="text" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>


            <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            >
            Login &rarr;
            <BottomGradient />
            </button>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            <div className="text-center text-sm text-neutral-300">
        Don't have an account?
            <Link href="/signup" className=" text-sky-600 hover:text-neutral-800 dark:hover:text-neutral-200">  Sign up</Link>
        </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        </div>
    );
    }

    const BottomGradient = () => {
    return (
        <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
    };

    const LabelInputContainer = ({
    children,
    className,
    }: {
    children: React.ReactNode;
    className?: string;
    }) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
        </div>
    );
    };
