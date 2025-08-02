import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const Hero = () => {
  return (
    <div className='px-2 py-4 text-white flex flex-col items-center w-full my-20'>
        <h1 className='text-7xl font-medium text-center tracking-tighter'>
        Your Virtual Universe Awaits
        </h1>
        <p className='max-w-2xl mx-auto text-center text-lg mt-4 text-neutral-300'>
        Connect, collaborate, and create in a vibrant 2D space. Transform your virtual interactions into extraordinary experiences.
        </p>
    <div className='flex flex-row items-center gap-4 mt-10'>
    <Link href="/spaces">
    <button
        className="relative cursor-pointer bg-sky-600 shadow-input rounded-xl border border-neutral-700 px-4 py-2 text-white hover:bg-neutral-700 hover:text-sky-400 transition-colors duration-400"
    >
        <div className='absolute inset-x-0 -bottom-px h-px w-full shadow-input bg-gradient-to-r from-transparent via-sky-600 to-transparent transition-all duration-400'></div>
        Launch Space
    </button>
    </Link>
    <Link href="/join">
    <button
        className="relative cursor-pointer shadow-input rounded-xl border border-neutral-700 px-4 py-2 text-white hover:bg-neutral-700 transition-colors duration-400"
    >
        <div className='absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent transition-all duration-400'></div>
        Join Space
    </button>
    </Link>
    </div>
    <div className='relative mt-6 max-w-7xl mx-auto'>  
    <div className='absolute inset-y-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent'></div>
    <Image src="/photo.png" alt="hero" width={1000} height={1000} className='rounded-xl w-full object-cover object-left-top border border-neutral-600 shadow-md' />
    </div>
    </div>
  )
}
