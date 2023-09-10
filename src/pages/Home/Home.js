import Contact from "./contact/Contact"
import AboutMe from "./about_me/AboutMe"
import Hobbies from "./hobbies/Hobbies"
import Stats from "./stats/Stats"
import "../../index.css"
import Experiences from "./experiences/Experiences"
import Topper from "./Topper"

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Topper />
            <div className="w-9/12">
                <AboutMe />
                <Hobbies />
                <Stats />
                <Experiences />
                <Contact />
            </div>
        </div>
    )
}

export default Home
