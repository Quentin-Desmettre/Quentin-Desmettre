import React, { useEffect, useState } from 'react'
import CheckMark from '../../assets/tick.svg'
import { fetchStats } from '../../utils/fetchGithubData'
import Project from '../../components/common/Project'
import { compareDateStrings } from '../../utils/time'
import { isInArray } from '../../utils/Strings'
import Star from '../../assets/star.png'
import Repository from '../../assets/repository.png'
import Loading from '../../assets/loading.svg'

const SearchBar = ({ text, setText, language }) => {
    return (
        <input className="w-7/12 text-sm text-white p-2 bg-main-background outline outline-1 outline-main-stroke rounded"
            type="text"
            value={text} onChange={(e) => setText(e.target.value)}
            placeholder={language.search_for_project}
        />
    )
}

const DropdownArrow = ({ isOpen }) => {

    return (<svg
        className={`ml-2 mt-1 h-5 w-5 transition-all z-10 ease-in-out duration-300 ${isOpen ? 'transform rotate-180 -translate-y-1' : ''}`}
        fill="#FFFFFF"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>)
}

const Filterer = ({ name, options, setProjects, selectedOptions, setSelectedOptions, type, onLeft = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const plainStyle = {
        radio: "outline outline-1 outline-light-light-background rounded-full bg-main-background",
        checkbox: "outline outline-1 outline-light-light-background bg-main-background"
    }
    const checkedStyle = {
        radio: "outline outline-[5px] outline-blue rounded-full -outline-offset-[4px]",
        checkbox: `${plainStyle.checkbox} relative after:content-['\\2713'] absolute`
    }

    const addOption = (option) => {
        setProjects([]);
        if (type === "radio") {
            console.log(option);
            setSelectedOptions([option]);
            return;
        }
        if (isInArray(selectedOptions, option, (a, b) => a.id === b.id)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.id !== option.id));
            return;
        }
        setSelectedOptions([...selectedOptions, option]);
    }

    return (
        <div className='relative'>
            <button className="w-28 h-full justify-center bg-light-background flex items-center px-2 py-1 outline outline-1 outline-main-stroke rounded"
                onClick={() => { setIsOpen(!isOpen); console.log(isOpen); }}
            >
                <span className='text-white'>{name}</span>
                <DropdownArrow isOpen={isOpen} />
            </button>
            <div className={`z-10 text-sm transition-all ease-in-out duration-300 text-white outline outline-1 outline-main-stroke rounded bg-light-background absolute ${onLeft ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} top-full ${isOpen ? "translate-y-1 scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}>
                {options.map((option) => {
                    const isOptionToDisplay = isInArray(selectedOptions, option, (a, b) => a.id === b.id);
                    return (
                        <div key={option.id}>
                            <button className='w-full hover:bg-light-light-background py-1 px-3 flex space-x-2 items-center' onClick={() => { addOption(option) }}>
                                <span className={`flex items-center justify-center w-4 h-4 transition-all ease-in-out duration-200 ${isOptionToDisplay ? checkedStyle[type] : plainStyle[type]}`}>
                                    <img className={`h-1/2 transition-all ease-in-out duration-200 ${type === "checkbox" && isOptionToDisplay ? "opacity-100" : "opacity-0"}`} src={CheckMark} alt={"checkmark"} />
                                </span>
                                <span className='w-max'>{option.text}</span>
                            </button>
                            <div className='w-full min-h-[1px] bg-light-light-background' />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const filterProjects = (projects, sortBy, tags, searchFilter) => {
    if (!projects)
        return projects

    searchFilter = searchFilter.toLowerCase();
    const filteredProjects = projects.filter((project) => {

        const areTagsValid =
            tags.length === 0 ||
            tags.every((tag) =>
                project.tags.some((projectTag) => projectTag.name === tag.name)
            );
        const isSearchFilterValid =
            searchFilter === "" ||
            project.name.toLowerCase().includes(searchFilter) ||
            project.description.toLowerCase().includes(searchFilter)
        ;

        return areTagsValid && isSearchFilterValid;
    })
    return filteredProjects.sort(sortBy[0].comparator);
}

const FadingInProject = ({ project, index }) => {
    const [isDisplayed, setIsDisplayed] = useState(false);

    setTimeout(() => {
        setIsDisplayed(true);
    }, 200 * (index + 1));

    return (
        <div className={`hover:scale-105 transform ${isDisplayed ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} w-full h-40 transition-all ease-in-out duration-500`}>
            <Project project={project} />
        </div>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <div className="w-full grid grid-cols-4 gap-4">
            {projects?.map((project, index) => (
                <FadingInProject key={index} project={project} index={index / 4} />
            ))}
        </div>
    )
}

const getAllTags = (projects) => {
    if (!projects)
        return [];

    let tags = [];
    projects.forEach((project) => {
        project.tags.forEach((tag) => {
            if (!tags.some((t) => t.name === tag.name))
                tags.push({ name: tag.name, id: tag.name });
        })
    })
    return tags;
}

const TextWithIcon = ({ text, icon, marginTop }) => {
    return (
        <div className='w-full flex items-center'>
            <img src={icon} alt={text} className={`h-5 mr-2 ${marginTop}`} />
            <span className="text-xl align-text-top font-bold">{text}</span>
        </div>
    )
}

const NoProjects = ({ texts }) => {
    return (
        <div className='flex flex-auto items-center justify-center space-x-2'>
            <img src={Loading} alt="loading" className='animate-spin w-6' />
            <span className='text-white font-bold text-sm'>
                {texts.loading_projects}
            </span>
        </div>
    )
}

const DisplayProjects = ({ texts, searchFilter, projects, filteredProjects }) => {
    console.log("projects:", projects)
    console.log("filteredProjects:", filteredProjects)
    return (
        <>
            {searchFilter === "" &&
                <div className={`w-full mt-10 space-y-4`}>
                    <TextWithIcon text={texts.featured_projects} icon={Star} />
                    <ProjectList projects={projects?.slice(0, 4)} />
                </div>
            }

            <div className='w-full mt-10 space-y-4 flex flex-auto flex-col'>
                <TextWithIcon text={texts.all_projects} icon={Repository} marginTop={"mt-1"} />
                <ProjectList projects={filteredProjects} />
            </div>
        </>
    )
}

const Projects = ({ language }) => {
    const texts = language.texts.projects;
    const sortByOptions = [
        { text: texts.sort.by_name, id: "name", comparator: (a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()) },
        { text: texts.sort.last_created, id: "last_creation", comparator: (a, b) => compareDateStrings(a.created_at, b.created_at, "desc") },
        { text: texts.sort.first_created, id: "first_creation", comparator: (a, b) => compareDateStrings(a.created_at, b.created_at, "asc") },
        { text: texts.sort.last_updated, id: "last_update", comparator: (a, b) => compareDateStrings(a.last_updated, b.last_updated, "desc") },
        { text: texts.sort.first_updated, id: "first_update", comparator: (a, b) => compareDateStrings(a.last_updated, b.last_updated, "asc") },
    ]
    const [text, setText] = useState("");
    const [sortBy, setSortBy] = useState([sortByOptions[0]]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [projects, setProjects] = useState(undefined);
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        setFilteredProjects(filterProjects(projects, sortBy, selectedTags, text));
    }, [projects, sortBy, selectedTags, text])

    if (!projects) {
        setTimeout(async () => {
            const newProjects = await fetchStats();
            setProjects(newProjects.repos);
        }, 500);
    }

    return (
        <div className="flex flex-col flex-1 items-center text-white mx-12 mt-12 min-h-max">
            <div className='flex space-x-4 w-full'>
                <SearchBar language={texts} text={text} setText={setText} />
                <Filterer name={texts.sort.title}
                    options={sortByOptions}
                    selectedOptions={sortBy}
                    setSelectedOptions={(options) => {
                        setSortBy(options);
                        setFilteredProjects(filterProjects(projects, options, selectedTags, text));
                    }}
                    type="radio"
                    setProjects={setFilteredProjects}
                />

                <Filterer name={texts.tags.title}
                    options={getAllTags(projects)}
                    selectedOptions={selectedTags}
                    setSelectedOptions={(options) => {
                        setSelectedTags(options);
                        setFilteredProjects(filterProjects(projects, sortBy, options, text));
                    }}
                    type="checkbox"
                    setProjects={setFilteredProjects}
                />
            </div>
            {projects ?
                <DisplayProjects texts={texts} searchFilter={text} projects={projects} filteredProjects={filteredProjects} />
                :
                <NoProjects texts={texts} />
            }
        </div>
    )
}


export default Projects
