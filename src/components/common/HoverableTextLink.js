const HoverableTextLink = ({ children, href, className, underlineColor, animation=true }) => {

    return (
        <a href={href} className={className + " text-white group text-center" + (animation ? " transition duration-300" : "")}>
            {children}
            <span className={underlineColor + " block max-w-0 group-hover:max-w-full h-0.5" + (animation ? " transition-all duration-300" : "")}></span>
        </a>
    )
}

export default HoverableTextLink;
