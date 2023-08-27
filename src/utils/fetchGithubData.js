
const defaultStatistics = {
    lines_of_code: 0,
    commits: 0,
    pull_requests: 0,
    projects: 0,
    nb_languages: 0,
    most_used_languages: [
        { name: '', use_percent: 0 },
        { name: '', use_percent: 0 },
        { name: '', use_percent: 0 },
    ]
}

const fetchStats = async (nbMostUsedLanguages, sortByLines = true) => {
    const response = await fetch('http://54.36.183.139:3000/user/Quentin-Desmettre/stats');

    if (!response.ok) {
        console.log(response);
        return null;
    }

    const data = await response.json();
    const languages = data.languages;
    const totalLines = Object.values(languages).reduce((acc, cur) => acc + cur.lines, 0);
    const totalBytes = Object.values(languages).reduce((acc, cur) => acc + cur.bytes, 0);
    const mostUsedLanguages = Object.keys(languages).sort((a, b) => {
        if (sortByLines)
            return languages[b].lines - languages[a].lines;
        return languages[b].bytes - languages[a].bytes;
    }).slice(0, nbMostUsedLanguages);

    return {
        lines_of_code: totalLines,
        commits: data.commits,
        pull_requests: data.pull_requests,
        projects: data.projects,
        nb_languages: Object.keys(languages).length,
        most_used_languages: mostUsedLanguages.map((language) => {
            return {
                name: language,
                use_percent: (languages[language][sortByLines ? 'lines' : 'bytes'] / (sortByLines ? totalLines : totalBytes)) * 100
            }
        })
    }
}

export {
    defaultStatistics,
    fetchStats
}
