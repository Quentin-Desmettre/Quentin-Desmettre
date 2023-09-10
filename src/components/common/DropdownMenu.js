import React, { useState } from "react";

const DropdownArrow = ({ isOpen }) => {
    return (<svg
        className={`ml-2 mt-1 h-5 w-5 transition-all z-10 ease-in-out duration-300 transform ${isOpen ? 'rotate-180 -translate-y-1' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>)
}

const DropdownMenu = ({ selectedStyle, dropdownStyle, choicesStyle, options, selectedOption, setOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (language) => {
        setOption(language);
        setIsOpen(false);
    };

    const DropdownOption = ({ name, image }) => {
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

    return (
        <div className="text-left">
            <button
                type="button"
                className={selectedStyle + " flex h-full items-center"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <DropdownOption {...selectedOption} />
                <DropdownArrow isOpen={isOpen}/>

            </button>
            <div
                className={dropdownStyle + " absolute rounded right-5 py-0 z-50 transition-all ease-in-out duration-500 origin-top  " + (isOpen ? "opacity-100 sacle-y-100" : "opacity-0 scale-y-0")}
                role="menu"
            >
                {options.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => handleOptionClick(option)}
                        className={choicesStyle + " w-full px-4 py-2 text-sm font-bold"}
                        role="menuitem"
                    >
                        <DropdownOption {...option} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DropdownMenu
