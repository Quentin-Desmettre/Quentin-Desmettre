
let languages = [];

const loadLanguages = () => {
    languages = [];

    // Go through every json file in the assets/languages folder.
    // for every file.json, if there is a file.png / file.jpg / file.jpeg / file.svg, add the parsed json & the image to the languages array.
    const req = require.context('../assets/languages', true, /\.json$/);
    req.keys().forEach((key) => {
        const language = req(key); // Language is the parsed json file.
        const name = key.replace('./', '').replace('.json', '');
        const image = require(`../assets/languages/${name}.png`);
        languages.push({
            name: language.name,
            image: image,
            texts: language
        })
    });

    return languages;
}

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

export {
    loadLanguages,
    getCurrentLanguage,
    setCurrentLanguage
}
