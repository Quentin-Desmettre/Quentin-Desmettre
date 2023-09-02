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

    const [day, month, year] = date.split('/').map(Number);
    const monthName = months[month - 1];

    return `${monthName} ${year}`;
}

export {
    convertDateFormat,
    convertToMonthYear
}
