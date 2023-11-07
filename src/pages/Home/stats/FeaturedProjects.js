import StarIcon from "../../../assets/star.png"
import HoverableTextLink from "../../../components/common/HoverableTextLink"
import Project from "../../../components/common/Project"
import MountTransition from "../../../components/common/MountTransition"

const FeaturedProjects = ({ language, projects }) => {
    const texts = language.texts.featured_projects;

    // TODO: Filter projects
    // projects = projects.filter((project) => project.featured);
    let projectsDisplayed = 0;
    const projectsName = [
        "EpiLinter",
        "Epitech-Corewar",
        "GomokuAi"
    ]
    projects = projectsName.map((name) => projects.find((project) => project.name === name))
    console.log(projects)
    return (
        <MountTransition styleFrom={"opacity-0 transform -translate-x-10"} styleTo={"opacity-100"}>
            <div className="bg-light-background rounded-lg outline-main-stroke outline outline-1 p-5 relative space-y-5">
                <div className="flex items-center">
                    <img className="w-6 h-6 mr-2" src={StarIcon} alt="Star icon" />
                    <span className="text-white text-2xl font-bold">{texts.title}</span>
                </div>

                <div className="flex justify-evenly space-x-6 w-full">
                    {!projects.some((project) => project === undefined) && Object.keys(projects).map((key) => {
                        if (projectsDisplayed++ >= 3)
                            return null;
                        return <Project key={key} name={key} name_color="text-green-text" underline_color="bg-green-text"
                            project={projects[key]}
                        />
                    })}
                </div>

                <div className="w-fit">
                    <HoverableTextLink className="text-green-text font-bold font-bold mt-2" href="" underlineColor="bg-green-text">
                        {texts.all_projects}
                    </HoverableTextLink>
                </div>
            </div>
        </MountTransition>
    )
}

export default FeaturedProjects
