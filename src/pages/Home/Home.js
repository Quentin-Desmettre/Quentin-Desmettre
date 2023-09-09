import Contact from "./contact/Contact"
import AboutMe from "./about_me/AboutMe"
import Hobbies from "./hobbies/Hobbies"
import Stats from "./stats/Stats"
import "../../index.css"
import Experiences from "./experiences/Experiences"

const Home = ({ language, sectionsRefs }) => {
    return (
        <div className="flex justify-center">
            <div className="w-9/12">
                <AboutMe language={language} destRef={sectionsRefs.about_me} />
                <Hobbies language={language} destRef={sectionsRefs.hobbies} />
                <Stats language={language} />
                <Experiences language={language} destRef={sectionsRefs.experiences} />
                <Contact language={language} destRef={sectionsRefs.contact} />
            </div>
        </div>
    )
}

export default Home
