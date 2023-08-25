
const Title = ({ title, image, shadowColor }) => {
    return (
        <div className="flex items-center text-white space-x-12">
            <img src={image} alt={title} className={`rounded-[15px] shadow-${shadowColor}`} />
            <h1 className="text-4xl font-bold">
                {title}
            </h1>
        </div>
    )
}

export default Title
