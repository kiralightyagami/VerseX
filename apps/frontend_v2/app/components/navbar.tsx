"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setIsLogin(false)
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')
        setIsLogin(true)
    }
    const links = [
        {
            href: "/spaces",
            title: "My Spaces"
        },
        {
            href: "/join",
            title: "Join Space" 
        }
    ]
    return (
    <div className='flex items-center justify-between px-4'>
        <Link href="/">
            <div className='flex items-center'>
            <Image src="/logo.svg" alt="logo" width={40} height={40}/>
            <h1 className='text-xl font-bold'>Verse-X</h1> 
            </div>
        </Link>
        <div className='flex items-center gap-6'>
        {links.map((link, index) => (
            <Link href={link.href} key={index} className='text-neutral-300 hover:text-neutral-100 transition-colors duration-300'>
                {link.title}
            </Link>
        ))}
    {isLogin ? (
    <>
    <Link href="/signin">
    <button
        className="relative cursor-pointer shadow-input rounded-xl border border-neutral-700 px-4 py-2 text-white hover:bg-neutral-700 transition-colors duration-400"
    >
        <div className='absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent'></div>
        Login
    </button>
    </Link>
    <Link href="/signup">
    <button
        className="relative cursor-pointer bg-sky-600 shadow-input rounded-xl border border-neutral-700 px-4 py-2 text-white hover:bg-neutral-700 transition-colors duration-400"
    >
        <div className='absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent transition-all duration-300'></div>
        Sign Up
    </button>
    </Link>
    </>
    ):(
        <button
        className="relative cursor-pointer bg-sky-600 shadow-input rounded-xl border border-neutral-700 px-4 py-2 text-white hover:bg-neutral-700 transition-colors duration-400"
        onClick={logOut}
    >
        <div className='absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent transition-all duration-300'></div>
        Logout
    </button>
    )}
        </div>
    </div>
    
  )
}

export default Navbar