import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import "./index.css"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useState } from 'react';

let languages = [];
const LoadLanguages = () => {
  languages = [];

  // Go through every json file in the assets/languages folder.
  // for every file.json, if there is a file.png / file.jpg / file.jpeg / file.svg, add the parsed json & the image to the languages array.
  const req = require.context('./assets/languages', true, /\.json$/);
  req.keys().forEach((key) => {
    console.log(key);
    const language = req(key); // Language is the parsed json file.
    const name = key.replace('./', '').replace('.json', '');
    const image = require(`./assets/languages/${name}.png`);
    languages.push({
      name: language.name,
      image: image,
      texts: language
    })
  });
}

const App = () => {
  console.log("App.js");
  LoadLanguages();
  console.log(languages);

  const getCurrentLanguage = () => {
    const currentLanguage = localStorage.getItem('language');
    const language = languages.find((language) => language.name === currentLanguage);

    if (!language) {
      setCurrentLanguage(languages[0].name);
      return languages[0];
    }
    return language;
  }
  const setCurrentLanguage = (language) => {
    localStorage.setItem('language', language.name);
  }

  const setLanguage = (language) => {
    setLanguageState(language);
    setCurrentLanguage(language);
  }

  let [language, setLanguageState] = useState(getCurrentLanguage());

  return (
    <div className="bg-main-background">
      <Header languages={languages} currentLanguage={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
