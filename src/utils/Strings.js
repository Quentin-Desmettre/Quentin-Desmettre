
const firstNWords = (str, n) => {
    return str.split(' ').slice(0, n).join(' ')
}
const extractFirstNWords = (str, n) => {
    const firstN = firstNWords(str, n)
    const restOfTheText = str.replace(firstN, '')
    return [firstN, restOfTheText]
}

export {
    firstNWords,
    extractFirstNWords
}
