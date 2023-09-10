import Contact from "./contact/Contact"
import AboutMe from "./about_me/AboutMe"
import Hobbies from "./hobbies/Hobbies"
import Stats from "./stats/Stats"
import "../../index.css"
import Experiences from "./experiences/Experiences"
import Topper from "./Topper"

const Home = ({ language }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Topper language={language} />
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
