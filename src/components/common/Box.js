const Box = ({ children, className }) => {
    return (
        <div className={`${className} bg-light-background rounded-lg outline-main-stroke outline outline-1`}>
            {children}
        </div>
    )
}

export default Box;
