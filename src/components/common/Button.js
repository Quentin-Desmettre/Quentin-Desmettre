
const Button = ({ children, disabled, className, onClick, image }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={className + " bg-green-button rounded py-2 flex items-center " + (disabled ? "opacity-50" : "opacity-100")}>
            <img src={image} alt="icon" className="mx-3 object-contain" />
            <p className="text-header-text mr-3 font-bold flex items-center">
                {children}
            </p>
        </button>
    )
}

export default Button
