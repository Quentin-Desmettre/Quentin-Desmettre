import Contact from "../components/layout/contact/Contact"
import "../index.css"

const Home = ({ language }) => {
    return (
        <div className="text-3xl">
            <Contact language={language}/>
        </div>
    )
}

export default Home
