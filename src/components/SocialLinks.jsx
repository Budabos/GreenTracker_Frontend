import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, WhatsApp } from "lucide-react";

const SocialLinks = () => {
    return (
        <div className="flex items-center gap-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Twitter className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Youtube className="w-6 h-6" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <WhatsApp className="w-6 h-6" />
            </a>
        </div>
    );
};

export default SocialLinks;
