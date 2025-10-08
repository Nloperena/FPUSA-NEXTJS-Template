"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'About Us', 
      href: '/about',
      submenu: [
        { name: 'Why Choose Us?', href: '/why-choose-us' },
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'Careers', href: '/careers' },
        { name: 'Testimonials', href: '/testimonials' }
      ]
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Our Designs', href: '/our-designs' },
    { 
      name: 'Our Services', 
      href: '/our-services',
      submenu: [
        { name: 'Property Managers', href: '/our-services/property-managers' },
        { name: 'Realtors', href: '/our-services/realtors' },
        { name: 'Residential Homeowners', href: '/our-services/homeowners' },
        { name: 'Investment Rental Property Owners', href: '/our-services/str-owners' }
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.svg"
                  alt="Furniture Packages USA"
                  className={`h-12 w-auto transition-all duration-300 ${
                    isScrolled ? '' : 'brightness-0 invert'
                  }`}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`${
                      isScrolled 
                        ? 'text-gray-700 hover:text-gray-900' 
                        : 'text-white hover:text-gray-300'
                    } transition-colors duration-200 font-medium`}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact Info - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <a
                href="tel:+1(407)-348-8848"
                className={`flex items-center ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white hover:text-gray-300'
                } transition-colors duration-200`}
              >
                <Phone className="w-4 h-4 mr-2 stroke-2" strokeWidth={2.5} />
                <span className="text-sm font-medium">(407)-348-8848</span>
              </a>
              <a
                href="mailto:info@furniturepackagesusa.com"
                className={`flex items-center ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white hover:text-gray-300'
                } transition-colors duration-200`}
              >
                <Mail className="w-4 h-4 mr-2 stroke-2" strokeWidth={2.5} />
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white hover:text-gray-300'
                } transition-colors duration-200`}
              >
                {isMenuOpen ? <X className="w-6 h-6 stroke-2" strokeWidth={2.5} /> : <Menu className="w-6 h-6 stroke-2" strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Contact Info */}
              <div className="flex flex-col space-y-3 pb-4 border-b border-gray-200">
                <a
                  href="tel:+1(407)-348-8848"
                  className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mr-2 stroke-2" strokeWidth={2.5} />
                  <span className="text-sm font-medium">(407)-348-8848</span>
                </a>
                <a
                  href="mailto:info@furniturepackagesusa.com"
                  className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mr-2 stroke-2" strokeWidth={2.5} />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>

              {/* Mobile Navigation */}
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Header Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Header;