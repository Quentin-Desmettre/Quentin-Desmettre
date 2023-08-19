import contact from "../../assets/contact.png"
import profile from "../../assets/profile.png"
import React from "react";
import { useState } from 'react';

const CircleButton = ({ image, href, className }) => {
    return (
        <a className={className + " rounded-full"} href={href}>
            <img src={image} alt="icon" />
        </a>
    )
}

const Button = ({ children, className, onClick, image }) => {
    return (
        <button onClick={onClick} className={className + " bg-button-background rounded py-2 flex items-center"}>
            <img src={image} alt="icon" className="ml-3 mr-3 object-contain" />
            <p className="text-header-text mr-3 font-bold">
                {children}
            </p>
        </button>
    )
}

const HeaderCategory = ({ text, href }) => {
    return (
        <a href={href} className="group text-header-text font-bold transition duration-300 flex-auto text-center mx-7">
            {text}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-header-underline"></span>
        </a>
    )
}

const Language = ({ name, image }) => {
    return (
        <span className="flex justify-between w-32 items-center">
            {name}
            <img
                src={image}
                alt="icon"
                className="object-scale-down w-7"
            />
        </span>
    )
}

const LanguageSelection = ({ languages, currentLanguage, setLanguage }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageClick = (language) => {
        setLanguage(language);
        setIsOpen(false);
    };

    return (
        <div className="text-left">
            <button
                type="button"
                className="text-header-text font-bold flex h-full items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Language {...currentLanguage} />
                <svg
                    className={`ml-2 h-5 w-5 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div
                    className="absolute w-40 bg-light-background rounded right-5 py-0"
                    role="menu"
                >
                    {languages.map((language) => (
                        <button
                            key={language.name}
                            onClick={() => handleLanguageClick(language)}
                            className="w-full px-4 py-2 text-sm text-header-text hover:bg-light-light-background"
                            role="menuitem"
                        >
                            <Language {...language} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const Header = (props) => {
    let texts = props.currentLanguage.texts;

    return (
        <div className="bg-header-background flex flex-1 py-3 px-2 items-center justify-between">
            <div className="flex items-center">
                <CircleButton image={profile} href="/" className="mx-4" />
                <Button image={contact} className="mx-4">
                    {texts.header.contact}
                </Button>
            </div>

            <div className="flex justify-evenly items-center">
                <HeaderCategory text={texts.header.about} href="/" />
                <HeaderCategory text={texts.header.hobbies} href="/" />
                <HeaderCategory text={texts.header.experiences} href="/" />
                <HeaderCategory text={texts.header.projects} href="/" />
                <div class="inline-block h-12 mr-4 min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100"></div>
                <LanguageSelection {...props} />
            </div>
        </div>
    )
}

export default Header
