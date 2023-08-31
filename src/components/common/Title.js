
const Title = ({ title, image, shadow }) => {
    return (
        <div className="flex items-center text-white space-x-12">
            <img src={image} alt={title} className={`w-[30px] h-[30px] rounded-full ${shadow}`} />
            <h1 className="text-4xl font-bold">
                {title}
            </h1>
        </div>
    )
}

export default Title
