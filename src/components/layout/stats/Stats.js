import Title from "../../common/Title"
import { formatValue } from "../../../utils/Strings"
import StatsIcon from "../../../assets/stats.png"
import ElementRow from "../../common/ElementRow"
import Box from "../../common/Box"
import React from "react"
import { useState, useRef } from "react"
import languageColors from "../../../utils/languages_colors"
import widthForPercent from "../../../utils/width_for_percent"
import { fetchStats, defaultStatistics } from "../../../utils/fetchGithubData"
import useMount from "../../../utils/useMount"
import FeaturedProjects from "./FeaturedProjects"

const Statistic = ({ title, value }) => {

    return (
        <div className="flex flex-col">
            <span className="font-bold text-green-text text-4xl ">
                {formatValue(value.toFixed(0))}
            </span>
            <span className="text-grey text-lg">
                {title}
            </span>
        </div>
    )
}

const ProgressBar = ({ title, value, color }) => {
    return (
        <div>
            <div className="flex justify-between font-bold">
                <span className="text-white">
                    {title}
                </span>
                <span className="text-grey">
                    {value.toFixed(1)}%
                </span>
            </div>
            <Box className={`flex w-64 h-5 rounded-md`}>
                <div className={`rounded-l-md ${color} ${widthForPercent[Math.floor(value)]}`} />
                <div className={`rounded-r-md ${color} opacity-30 ${widthForPercent[100 - Math.floor(value)]}`} />
            </Box>
        </div>
    )
}

const displayStats = (data, setStatistics) => {
    const frames = 20
    const animDuration = 1000
    let executedFrames = 0
    let currentStats = defaultStatistics

    currentStats.most_used_languages = data.most_used_languages.map((language) => ({ name: language.name, use_percent: 0 }))

    const increaseValue = (field, currentValue = currentStats, targetValue = data) => {
        // Fast increase at first, then slower
        if (executedFrames === frames - 1)
            return targetValue[field]
        if (executedFrames < frames / 2)
            return currentValue[field] + (targetValue[field] - currentValue[field]) / 3
        return currentValue[field] + (targetValue[field] - currentValue[field]) / 7
    }
    const interval = setInterval(() => {
        currentStats = {
            repos: data.repos,
            lines_of_code: increaseValue("lines_of_code"),
            commits: increaseValue("commits"),
            pull_requests: increaseValue("pull_requests"),
            projects: increaseValue("projects"),
            nb_languages: increaseValue("nb_languages"),
            most_used_languages: currentStats.most_used_languages.map((language, index) => ({
                name: language.name,
                use_percent: increaseValue("use_percent", language, data.most_used_languages[index])
            }))
        }
        setStatistics(currentStats)
        executedFrames++
        if (executedFrames >= frames) {
            clearInterval(interval)
        }
    }, animDuration / frames)
}

const Stats = ({ language }) => {
    const texts = language.texts.statistics;
    const [statistics, setStatistics] = useState(defaultStatistics);

    const tryFetchStats = async () => {
        if (statistics.lines_of_code !== 0)
            return;

        let data = await fetchStats(3, true);
        if (data === null)
            return;
        displayStats(data, setStatistics)
    }

    const sectionRef = useRef();
    useMount(sectionRef, tryFetchStats);
    return (
        <>
            <Title title={texts.title} image={StatsIcon} />
            <div ref={sectionRef}>
                <ElementRow className="ml-44 mr-28">
                    <Statistic title={texts.lines_of_code} value={statistics.lines_of_code} />
                    <Statistic title={texts.commits} value={statistics.commits} />
                    <Statistic title={texts.pull_requests} value={statistics.pull_requests} />
                    <Statistic title={texts.projects} value={statistics.projects} />
                    <Statistic title={texts.languages} value={statistics.nb_languages} />
                </ElementRow>
                <span className="text-white ml-44 text-lg font-bold">
                    {texts.most_used_languages}
                </span>
                <ElementRow className="ml-44 space-x-12 w-1">
                    {statistics.most_used_languages.map((language, index) => {
                        let color = languageColors[language.name]?.color;
                        if (color === undefined)
                            color = 'bg-grey';
                        return <ProgressBar key={index} title={language.name} value={language.use_percent} color={color} />
                    })}
                </ElementRow>
            </div>
            <FeaturedProjects language={language} projects={statistics.repos}/>
        </>
    )
}

export default Stats
