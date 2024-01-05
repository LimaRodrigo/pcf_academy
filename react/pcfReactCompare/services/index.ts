export const formatDatetimeBr = (date: Date) => {
    return new Intl.DateTimeFormat("pt-br", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }).format(date);
}