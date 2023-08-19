
const CircleButton = ({ image, href, className }) => {
    return (
        <a className={className + " rounded-full"} href={href}>
            <img src={image} alt="icon" />
        </a>
    )
}

export default CircleButton
