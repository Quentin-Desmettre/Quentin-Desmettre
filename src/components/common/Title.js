import { boxShadow, fromColor } from "../../utils/colors"

const Title = ({ title, image, color, topBorder = true, children, withLeftBar }) => {
    return (
        <div className="ml-4 flex flex-col">
            <div className="w-[30px] flex justify-center mb-6">
                <span className={`6 w-[3px] h-[41px] ${topBorder ? "bg-gradient-to-t" : ""} ${fromColor[color]} to-main-background`} />
            </div>

            <div className="flex items-center">
                <img src={image} alt={title} className={`w-[30px] h-[30px] rounded-full ${boxShadow[color]}`} />
                <h1 className="text-4xl font-bold ml-12 text-white">
                    {title}
                </h1>
            </div>

            <div className="flex mt-6 relative">
                <div className="flex w-[30px] justify-center">
                    <span className={`w-[3px] min-h-[41px] h-full bg-gradient-to-b ${fromColor[color]} to-main-background relative`} />
                </div>
                <div className="w-full">
                    {children}
                </div>
                {withLeftBar}
            </div>
        </div>
)
}

export default Title
