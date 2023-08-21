import contact from "../../../assets/contact.png"
import profile from "../../../assets/profile.png"
import React from "react";
import Button from "../../common/Button";
import CircleButton from "../../common/CircleButton";
import DropdownMenu from "../../common/DropdownMenu";
import HoverableTextLink from "../../common/HoverableTextLink";
import ElementRow from "../../common/ElementRow";

const HeaderText = ({ href, children }) => {
    return (
        <HoverableTextLink underlineColor={"bg-header-underline"} href={href} className="text-header-text font-bold mx-7">
            {children}
        </HoverableTextLink>
    )
}

const Header = ({ languages, language, setLanguage }) => {
    const texts = language.texts;

    return (
        <div className="bg-header-background flex py-3 px-2 items-center justify-between">
            <div className="flex items-center">
                <CircleButton image={profile} href="/" className="mx-4" />
                <Button image={contact} className="mx-4">
                    {texts.header.contact}
                </Button>
            </div>

            <ElementRow>
                <HeaderText href="/">{texts.header.about}</HeaderText>
                <HeaderText href="/">{texts.header.hobbies}</HeaderText>
                <HeaderText href="/">{texts.header.experiences}</HeaderText>
                <HeaderText href="/">{texts.header.projects}</HeaderText>

                <div className="inline-block h-12 mr-6 min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100"></div>
                <DropdownMenu options={languages} selectedOption={language} setOption={setLanguage}
                    selectedStyle="text-header-text font-bold"
                    dropdownStyle="w-40 bg-light-background"
                    choicesStyle="text-header-text hover:bg-light-light-background"
                />
            </ElementRow>
        </div>
    )
}

export default Header
