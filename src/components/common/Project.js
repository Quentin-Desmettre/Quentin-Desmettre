import LanguagesColors from "../../utils/languages_colors"
import { getContrast } from "../../utils/colors"
import { convertDateFormat } from "../../utils/time"
import Box from "./Box"
import HoverableTextLink from "./HoverableTextLink"

const TimeInfo = ({ time, text }) => {
    return (
        <span className="text-left text-xs text-grey">
            {text}: <span className="font-bold text-[#AFAFAF]">{time}</span>
        </span>
    )
}

const Tag = ({ tag }) => {
    const backgroundColor = LanguagesColors[tag.name] ? LanguagesColors[tag.name].color : "bg-[#2876DE]";
    const hexCode = backgroundColor.substring(4).replace("]", "");
    const contrastWithWhite = getContrast(hexCode, "#000000");
    const contrastWithBlack = getContrast(hexCode, "#ffffff");
    const textColor = contrastWithWhite > contrastWithBlack ? "text-black" : "text-white";

    return (
        <div key={tag.name} className={`w-12 text-[10px] flex items-center justify-center h-6 rounded-full ${textColor} ${backgroundColor}`}>
            {tag.short_name ? tag.short_name : tag.name}
        </div>
    )
}

const Link = ({ link }) => {
    return (
        <a key={link.url} href={link.url} target="blank" className="">
            <img src={link.icon} alt={link.name} className="w-5 h-5" />
        </a>
    )
}

const IconList = ({ objects, type }) => {
    if (!["tags", "links"].includes(type))
        return null;
    return (
        <div className="flex space-x-2 items-center">
            {objects.map((object) => (
                (type === "tags") ? <Tag tag={object} /> : <Link link={object} />
            ))}
        </div>
    )
}

const Project = ({ project, name_color = "text-blue", underline_color = "bg-blue" }) => {
    let { name, description, tags, links, created_at, last_updated, url } = project;
    const updated_at = convertDateFormat(last_updated);
    created_at = convertDateFormat(created_at);

    return (
        <div className="w-full h-full" key={url}>
            <Box className="flex flex-col px-5 py-3 bg-main-background w-full h-full">
                <div className="flex justify-between">
                    <HoverableTextLink className={"text-left text-xl w-fit truncate mr-8 " + name_color}
                        underlineColor={underline_color} href={url} target="blank" animation={false}>
                        {name}
                    </HoverableTextLink>
                    <IconList type="tags" objects={tags} />
                </div>

                <div className="text-justify text-sm text-grey mt-2 mb-4">
                    {description}
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <TimeInfo text="Created" time={created_at} />
                        <TimeInfo text="Last updated" time={updated_at} />
                    </div>
                    <IconList type="links" objects={links} />
                </div>
            </Box>
        </div>
    )
}

export default Project
