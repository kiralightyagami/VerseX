"use client";
import React, { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { BottomGradient } from "../../components/ui/bottom-gradient";
import { LabelInputContainer } from "../../components/ui/label-input-container";
import { cn } from "../../lib/utils";
import {
IconBrandGithub,
IconBrandGoogle,
IconBrandOnlyfans,
} from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function JoinSpace() {
const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [formData, setFormData] = useState({
    Id: "",
});
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormData({
    Id: e.target.Id.value,
    });
    console.log(formData);
    setIsLoading(true);
    try {
        const response = await axios.get(`${backendUrl}api/v1/space/${e.target.Id.value}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    if (response.status == 200) {
        setSuccess("Space joined successfully");
        router.push(`/space/${e.target.Id.value}`);   
    }
    } catch (error: any) {
        if (error.response?.status === 400 && error.response.data?.message === 'Username already exists') {
            setError('Username already exists');
        } else {
            console.error("Error:", error);
        }
    } finally {
    setIsLoading(false);
    }
};

return (
    
    <div className="shadow-input mx-auto w-full max-w-md mt-10 rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 ">
        Join a Space
    </h2>
    <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Enter the space ID to join...
    </p>

    <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
        <Label htmlFor="Id">Space ID</Label>
        <Input id="Id" placeholder="1234567890" type="text" />
        </LabelInputContainer>


        <button
        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
        type="submit"
        >
        Join Space &rarr;
        <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="text-center text-sm text-neutral-300">
        Create your own space?
            <Link href="/spaces" className=" text-sky-600 hover:text-neutral-800 dark:hover:text-neutral-200">  Launch space</Link>
        </div>

    </form>
    {error && <p className="text-red-500">{error}</p>}
    {success && <p className="text-green-500">{success}</p>}
    </div>
);
}




