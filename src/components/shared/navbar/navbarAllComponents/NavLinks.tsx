import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';


interface NavLinksProps {
  navLinks: {
    name: string;
    href: string;
    icon: IconType;
  }[];
}

const NavLinks = ({navLinks} : NavLinksProps) => {
    return (
        <div className="hidden md:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative flex items-center space-x-1 px-3 xl:px-4 py-2 text-gray-700 hover:text-primary transition-all duration-300 font-medium group text-sm lg:text-base rounded-lg hover:bg-primary/5"
            >
              <link.icon className="w-4 h-4 xl:w-5 xl:h-5 text-secondary group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
              <span>{link.name}</span>
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                layoutId="underline"
              />
            </Link>
          ))}
        </div>
    );
};

export default NavLinks;