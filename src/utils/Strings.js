
const firstNWords = (str, n) => {
    return str.split(' ').slice(0, n).join(' ')
}
const extractFirstNWords = (str, n) => {
    const firstN = firstNWords(str, n)
    const restOfTheText = str.replace(firstN, '')
    return [firstN, restOfTheText]
}

const formatValue = (value) => {
    // 1356789 => 1,356,789

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const convertToMonthYear = (date, months) => {
    if (date === "N/A")
        return "Aujourd'hui"

    const [day, month, year] = date.split('/').map(Number);
    const monthName = months[month - 1];

    return `${monthName} ${year}`;
}

export {
    firstNWords,
    extractFirstNWords,
    formatValue,
    convertToMonthYear,
}
