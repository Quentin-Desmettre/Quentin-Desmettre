import React from "react";
import { createContext, useState } from "react";
import { getCurrentLanguage, setCurrentLanguage, loadLanguages } from '../services/LanguageService';

const languages = loadLanguages();
const LanguageContext = createContext({
    language: getCurrentLanguage(),
    languages: languages,
    setLanguage: () => { }
});
const LanguageContextProvider = LanguageContext.Provider;

const LanguageProvider = ({ children }) => {
    let [languageState, setLanguageState] = useState(getCurrentLanguage());

    const setLanguage = (language) => {
        setLanguageState(language);
        setCurrentLanguage(language);
    }

    return (
        <LanguageContextProvider value={{
            language: languageState,
            languages: languages,
            setLanguage: setLanguage
        }}>
            {children}
        </LanguageContextProvider>
    );
}

export {
    LanguageContext,
    LanguageProvider
}
