import { boxShadow, fromColor } from "../../utils/colors"
import ExpBranch from "../../assets/exp_branch.svg";


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
        // <div className="flex items-center text-white space-x-12 ml-4">
        //     <div className="flex flex-col items-center">
        //         <span className={`mb-6 w-[3px] h-[41px] ${topBorder ? "bg-gradient-to-t" : ""} ${fromColor[color]} to-main-background`} />
        //         <img src={image} alt={title} className={`w-[30px] h-[30px] rounded-full ${boxShadow[color]}`} />
        //         <span className={`mt-6 w-[3px] h-[41px] bg-gradient-to-b ${fromColor[color]} to-main-background`} />
        //     </div>
        //     <h1 className="text-4xl font-bold">
        //         {title}
        //     </h1>
        // </div>
    )
}

export default Title
