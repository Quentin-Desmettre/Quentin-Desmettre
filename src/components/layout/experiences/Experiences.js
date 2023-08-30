import Title from "../../common/Title"
import ExperienceIcon from "../../../assets/experiences.png"
import Box from "../../common/Box";
import { getOpacity } from "../../../utils/colors";

const convertToMonthYear = (date, months) => {
    if (date === "N/A")
        return "Aujourd'hui"

    const [day, month, year] = date.split('/').map(Number);
    const monthName = months[month - 1];

    return `${monthName} ${year}`;
}

const Experience = ({ experience, months }) => {
    const { title, company, logo, location, start_date, end_date, description } = experience;
    const formatted_start_date = convertToMonthYear(start_date, months);
    const formatted_end_date = convertToMonthYear(end_date, months);
    const image = require(`../../../assets/${logo}`);

    return (
        <Box className="flex flex-col p-6 w-[475px] h-[170px]">
            <div className="flex mb-4 items-center">
                <img src={image} alt={company} className="h-12 mr-3" />
                <div className="flex flex-col">
                    <span className="text-white font-bold text-xl">
                        {title}
                    </span>
                    <span className="text-white text-sm">
                        {company}, {location} - {formatted_start_date} / {formatted_end_date}
                    </span>
                </div>

            </div>

            <div className="text-grey text-sm">
                {description}
            </div>
        </Box>
    )
}

const Corner = ({ opacity = 1, onLeft = false }) => {
    const opacityClass = getOpacity(opacity);
    return (
        <div className="relative">
            <span className={`w-16 h-[150px] bg-transparent absolute border-brown ${opacityClass} border-t-2 ` +
                (onLeft ?
                    "border-l-2 rounded-tl-xl right-0"
                :   "border-r-2 rounded-tr-xl")
            } />
        </div>
    )
}

const ExperienceList = ({ experiences, months }) => {
    let rows = [];
    let opacity = 1;
    let cornerOpacity = 0.825;

    for (let i = 0, rowIndex = 0; i < experiences.length; i += 2, rowIndex++) {
        const leftExperienceIndex = rowIndex % 2 ? i + 1 : i;
        const rightExperienceIndex = rowIndex % 2 ? i : i + 1;
        const hasTwoExperiences = i + 1 < experiences.length;
        const hasNextRow = i + 2 < experiences.length;
        const isOnLeft = rowIndex % 2;

        rows.push(
            <div className={`flex flex-row items-center ${rowIndex % 2 ? "ml-24" : "mr-24"}`}>
                {hasNextRow && isOnLeft &&
                    <Corner onLeft={true} opacity={cornerOpacity} />
                }
                <Experience experience={experiences[leftExperienceIndex]} months={months} />
                {hasTwoExperiences &&
                    <span className={`bg-brown w-20 h-[3px] ${getOpacity(opacity)}`} />
                }
                {hasTwoExperiences &&
                    <Experience experience={experiences[rightExperienceIndex]} months={months} />
                }
                {hasNextRow && !isOnLeft &&
                    <Corner onLeft={false} opacity={cornerOpacity} />
                }
            </div>
        )
        opacity = Math.max(0.3, opacity - 0.175);
        cornerOpacity = Math.max(0.3, cornerOpacity - 0.175);
    }
    return (
        <div className="space-y-16">
            {rows}
        </div>
    )
}

const Experiences = ({ language }) => {
    const texts = language.texts.experiences;
    console.log(texts)

    return (
        <>
            <Title title={texts.title} image={ExperienceIcon} shadowColor="blue" />
            <ExperienceList experiences={texts.experiences} months={language.texts.months} />
        </>
    )
}

export default Experiences
