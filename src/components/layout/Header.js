import contact from "../../assets/contact.png"
import profile from "../../assets/profile.png"
import React from "react";
import Button from "../common/Button";
import CircleButton from "../common/CircleButton";
import DropdownMenu from "../common/DropdownMenu";
import HeaderCategory from "../common/HeaderCategory";

const Header = ({ languages, currentLanguage, setLanguage }) => {
    let texts = currentLanguage.texts;

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
                <div class="inline-block h-12 mr-6 min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100"></div>
                <DropdownMenu options={languages} selectedOption={currentLanguage} setOption={setLanguage}
                    selectedStyle="text-header-text font-bold"
                    dropdownStyle="w-40 bg-light-background"
                    choicesStyle="text-header-text hover:bg-light-light-background"
                />
            </div>
        </div>
    )
}

export default Header
