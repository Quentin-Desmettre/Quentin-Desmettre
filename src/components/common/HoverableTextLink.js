import { HashLink } from 'react-router-hash-link';

const HoverableTextLink = ({ children, href, className, underlineColor, animation = true, target = null }) => {

    return (
        <HashLink to={href} target={target} className={className + " group text-center" + (animation ? " transition duration-300" : "")}>
            {children}
            <span className={underlineColor + " block max-w-0 group-hover:max-w-full h-0.5" + (animation ? " transition-all duration-300" : "")}></span>
        </HashLink>
    )
}

export default HoverableTextLink;
