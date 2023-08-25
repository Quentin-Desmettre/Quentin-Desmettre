import Contact from "../components/layout/contact/Contact"
import AboutMe from "../components/layout/about_me/AboutMe"
import "../index.css"

const Home = ({ language }) => {
    return (
        <div className="flex justify-center">
            <div className="w-9/12">
                <AboutMe language={language} />
                <Contact language={language} />
            </div>
        </div>
    )
}

export default Home
