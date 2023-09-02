import { Link } from 'react-router-dom';

const HoverableTextLink = ({ children, href, className, underlineColor, animation = true, target = null, destRef }) => {

    const handleOnClick = () => {
        if (destRef && destRef.current)
            destRef.current.scrollIntoView();
    }
    return (
        <Link onClick={handleOnClick} to={href} target={target} className={className + " group text-center" + (animation ? " transition duration-300" : "")}>
            {children}
            <span className={underlineColor + " block max-w-0 group-hover:max-w-full h-0.5" + (animation ? " transition-all duration-300" : "")}></span>
        </Link>
    )
}

export default HoverableTextLink;
