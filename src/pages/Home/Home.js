import Contact from "./contact/Contact"
import AboutMe from "./about_me/AboutMe"
import Hobbies from "./hobbies/Hobbies"
import Stats from "./stats/Stats"
import "../../index.css"
import Experiences from "./experiences/Experiences"

const Home = ({ language }) => {
    return (
        <div className="flex justify-center">
            <div className="w-9/12">
                <AboutMe language={language} />
                <Hobbies language={language} />
                <Stats language={language} />
                <Experiences language={language} />
                <Contact language={language} />
            </div>
        </div>
    )
}

export default Home
