import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import "./index.css"
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import React from 'react';
import { LanguageProvider } from './contexts/language';

const App = () => {

    return (
        <LanguageProvider>
            <div className="bg-main-background flex flex-col justify-between min-h-screen">

                <Header />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/projects" element={<Projects/>} />
                </Routes>
                <Footer/>
            </div>
        </LanguageProvider>
    );
};

export default App;
