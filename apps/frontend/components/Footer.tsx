import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <Link 
              href="https://github.com" 
              className="text-gray-500 hover:text-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center font-pixel-body text-lg text-gray-600">
              &copy; {new Date().getFullYear()} verseX. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="font-pixel-body text-gray-600 hover:text-black">
              Privacy
            </Link>
            <Link href="#" className="font-pixel-body text-gray-600 hover:text-black">
              Terms
            </Link>
            <Link href="#" className="font-pixel-body text-gray-600 hover:text-black">
              About
            </Link>
            <Link href="#" className="font-pixel-body text-gray-600 hover:text-black">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;