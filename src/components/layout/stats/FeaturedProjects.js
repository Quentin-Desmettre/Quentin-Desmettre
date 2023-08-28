import Box from "../../common/Box"
import StarIcon from "../../../assets/star.png"
import HoverableTextLink from "../../common/HoverableTextLink"
import Project from "../../common/Project"

const FeaturedProjects = ({ language, projects }) => {
    const texts = language.texts.featured_projects;

    // TODO: Filter projects
    // projects = projects.filter((project) => project.featured);
    let projectsDisplayed = 0;
    return (
        <Box className="p-5 relative space-y-5">
            <div className="flex items-center">
                <img className="w-6 h-6 mr-2" src={StarIcon} alt="Star icon" />
                <span className="text-white text-2xl font-bold">{texts.title}</span>
            </div>

            <div className="flex justify-evenly space-x-6 w-full">
                {Object.keys(projects).map((key) => {
                    if (projectsDisplayed++ >= 3)
                        return null;
                    return <Project name={key} name_color="text-green-text" underline_color="bg-green-text"
                        description={projects[key].desc}
                        created_at={projects[key].created_at}
                        updated_at={projects[key].last_updated}
                        url={projects[key].url}
                        tags={projects[key].tags}
                        links={projects[key].links}
                    />
                })}
            </div>

            <div className="w-fit">
                <HoverableTextLink className="text-green-text font-bold font-bold mt-2" href="" underlineColor="bg-green-text">
                    {texts.all_projects}
                </HoverableTextLink>
            </div>
        </Box>
    )
}

export default FeaturedProjects
