
const CircleButton = ({ image, href, onClick, className }) => {
    return (
        href ?
            <a className={className + " rounded-full"} href={href}>
                <img src={image} alt="icon" />
            </a>
        :
            <button className={className + " rounded-full"} onClick={onClick}>
                <img src={image} alt="icon" />
            </button>
    )
}

export default CircleButton
