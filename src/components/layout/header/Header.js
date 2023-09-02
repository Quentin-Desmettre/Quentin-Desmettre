import contact from "../../../assets/contact.png"
import profile from "../../../assets/profile.png"
import React from "react";
import Button from "../../common/Button";
import CircleButton from "../../common/CircleButton";
import DropdownMenu from "../../common/DropdownMenu";
import HoverableTextLink from "../../common/HoverableTextLink";
import ElementRow from "../../common/ElementRow";
import useScrollDirection from "../../../utils/useScrollDirection";

const HeaderText = ({ href, children, destRef }) => {
    return (
        <HoverableTextLink destRef={destRef} underlineColor={"bg-header-underline"} href={href} className="text-header-text font-bold mx-7">
            {children}
        </HoverableTextLink>
    )
}

const Header = ({ languages, language, setLanguage, sectionsRefs }) => {
    const texts = language.texts;

    const handleClickOnCircle = () => {
        if (sectionsRefs.contact && sectionsRefs.contact.current)
            sectionsRefs.contact.current.scrollIntoView();
    }
    const scrollDirection = useScrollDirection();
    return (
        <div ref={sectionsRefs.header} className={`z-10 h-24 sticky ${scrollDirection === "down" ? "-top-24" : "top-0"} transition-all duration-500 bg-header-background flex py-3 px-2 items-center justify-between`}>
            <div className="flex items-center">
                <CircleButton image={profile} href="/" className="mx-4" />
                <Button image={contact} className="mx-4" onClick={handleClickOnCircle}>
                    {texts.header.contact}
                </Button>
            </div>

            <ElementRow>
                <HeaderText destRef={sectionsRefs.about_me}>{texts.header.about}</HeaderText>
                <HeaderText destRef={sectionsRefs.hobbies}>{texts.header.hobbies}</HeaderText>
                <HeaderText destRef={sectionsRefs.experiences}>{texts.header.experiences}</HeaderText>
                <HeaderText href="/projects">{texts.header.projects}</HeaderText>

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
