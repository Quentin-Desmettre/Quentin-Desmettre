import Contact from "../components/layout/contact/Contact"
import AboutMe from "../components/layout/about_me/AboutMe"
import Hobbies from "../components/layout/hobbies/Hobbies"
import Stats from "../components/layout/stats/Stats"
import "../index.css"
import Experiences from "../components/layout/experiences/Experiences"

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
