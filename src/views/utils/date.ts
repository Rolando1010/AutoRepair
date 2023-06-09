const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const getMonthAmountDays = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
}

const getDateDay = (day: number, month: number, year: number) => {
    return new Date(`${month}/${day}/${year}`);
}

export {
    days,
    months,
    getMonthAmountDays,
    getDateDay
}