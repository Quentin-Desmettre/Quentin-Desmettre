const convertDateFormat = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

const convertToMonthYear = (date, months) => {
    if (date === "N/A")
        return "Aujourd'hui"

    const [, month, year] = date.split('/').map(Number);
    const monthName = months[month - 1];

    return `${monthName} ${year}`;
}

const compareDateStrings = (dateString1, dateString2, order = "asc") => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    if (order === "asc")
        return date1 - date2;
    return date2 - date1;
}

export {
    convertDateFormat,
    convertToMonthYear,
    compareDateStrings,
}
