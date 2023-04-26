import { useMemo, useState } from "react";
import { getDateDay, getMonthAmountDays, months } from "../utils/date";

const useCalendar = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const detailMonth = useMemo(() => `${months[month]} ${year}`, [month, year]);

    const weeksMonth = useMemo(() => {
        const amountDays = getMonthAmountDays(month, year);
        const firstDayIndexWeek = getDateDay(1, month, year).getDay();
        const weeks: Date[][] = [];
        let currentWeek: Date[] = Array(firstDayIndexWeek).fill(null);
        for(let i=1; i<=amountDays; i++) {
            if(currentWeek.length === 7){
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentWeek.push(getDateDay(i, month, year));
        }
        weeks.push(currentWeek.concat(Array(7 - currentWeek.length).fill(null)));
        return weeks;
    }, [month, year]);

    const incrementhMonth = () => {
        setYear(month === 11 ? year + 1 : year);
        setMonth(month === 11 ? 0 : month + 1);
    }

    const decrementhMonth = () => {
        setYear(month === 0 ? year - 1 : year);
        setMonth(month === 0 ? 11 : month - 1);
    }

    return {
        month,
        year,
        detailMonth,
        weeksMonth,
        incrementhMonth,
        decrementhMonth
    }
}

export default useCalendar;