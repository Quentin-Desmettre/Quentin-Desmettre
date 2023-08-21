import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import "./index.css"
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { useState } from 'react';
import { getCurrentLanguage, setCurrentLanguage, loadLanguages } from './services/LanguageService';

const App = () => {
  const languages = loadLanguages();

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
