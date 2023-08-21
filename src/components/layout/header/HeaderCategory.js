
const HeaderCategory = ({ text, href }) => {
    return (
        <a href={href} className="group text-header-text font-bold transition duration-300 flex-auto text-center mx-7">
            {text}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-header-underline"></span>
        </a>
    )
}

export default HeaderCategory
