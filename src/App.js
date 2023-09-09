import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import "./index.css"
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { useState } from 'react';
import React from 'react';
import { getCurrentLanguage, setCurrentLanguage, loadLanguages } from './services/LanguageService';

const App = () => {
    const languages = loadLanguages();

    const setLanguage = (language) => {
        setLanguageState(language);
        setCurrentLanguage(language);
    }

    let [language, setLanguageState] = useState(getCurrentLanguage());

    return (
        <div className="bg-main-background flex flex-col justify-between min-h-screen">

            <Header languages={languages} language={language} setLanguage={setLanguage} />
            <Routes>
                <Route path="/" element={<Home language={language} />} />
                <Route path="/projects" element={<Projects language={language} />} />
            </Routes>
            <Footer language={language} />
        </div>
    );
};

export default App;
