'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  navLinks: {
    name: string;
    href: string;
    icon: IconType;
  }[];
}

const NavLinks = ({ navLinks }: NavLinksProps) => {
  const pathname = usePathname(); // get current route
  return (
    <div className="hidden md:flex items-center gap-2">
      {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative flex items-center space-x-2 px-4 py-2 font-medium text-sm rounded-lg transition-all duration-300 group border-b-2 border-transparent ${pathname === link.href ? 'text-primary bg-primary/5 border-primary' : 'text-gray-700 hover:text-primary hover:bg-primary/5'}`}
          >
            <link.icon className="w-4 h-4 text-secondary group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
            <span>{link.name}</span>
          </Link>
      ))}
    </div>
  );
};

export default NavLinks;