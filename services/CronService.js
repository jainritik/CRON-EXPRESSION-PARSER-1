const CronParser = require('../utils/CronParser');
const {
    STARTING_MINUTES_IN_HOUR,
    ENDING_MINUTES_IN_HOUR,
    STARTING_HOURS_IN_DAY,
    ENDING_HOURS_IN_DAY,
    STARTING_DAYS_IN_WEEK,
    ENDING_DAYS_IN_WEEK,
    STARTING_MONTHS_IN_YEAR,
    ENDING_MONTHS_IN_YEAR,
    STARTING_DAYS_IN_MONTH,
    ENDING_DAYS_IN_MONTH
} = require('../utils/Constants');

class CronService {
    static parseCronExpression(cronString) {
        const [minute, hour, dayOfMonth, month, dayOfWeek, command] = cronString.split(/\s+/);
    
        const minuteArr = CronParser.parseField(minute, STARTING_MINUTES_IN_HOUR, ENDING_MINUTES_IN_HOUR);
        const hourArr = CronParser.parseField(hour, STARTING_HOURS_IN_DAY, ENDING_HOURS_IN_DAY);
        const dayOfMonthArr = CronParser.parseField(dayOfMonth, STARTING_DAYS_IN_MONTH, ENDING_DAYS_IN_MONTH);
        const monthArr = CronParser.parseField(month, STARTING_MONTHS_IN_YEAR, ENDING_MONTHS_IN_YEAR);
        const dayOfWeekArr = CronParser.parseField(dayOfWeek, STARTING_DAYS_IN_WEEK, ENDING_DAYS_IN_WEEK);
    
        // Function to get the number of days in a month
        const daysInMonth = (month, year) => {
            return new Date(year, month, 0).getDate();
        };

        // Get the current year and month
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; //January is month 1

        const daysToRemove = [];

        // Check for dates exceeding the number of days in the current month
        dayOfMonthArr.forEach(day => {
            const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
            if (day > daysInCurrentMonth) {
                daysToRemove.push(day);
            }
        });

        // Remove the invalid dates from the array
        daysToRemove.forEach(dayToRemove => {
            const indexToRemove = dayOfMonthArr.indexOf(dayToRemove);
            if (indexToRemove !== -1) {
                dayOfMonthArr.splice(indexToRemove, 1);
            }
        });

    
        return {
            'minute': minuteArr,
            'hour': hourArr,
            'day of month': dayOfMonthArr,
            'month': monthArr,
            'day of week': dayOfWeekArr,
            'command': command
        };
    }
    

    static formatOutput(cronExpression) {
        let output = '';
        for (const field in cronExpression) {
            const value = cronExpression[field];
            if (Array.isArray(value)) {
                output += field.padEnd(14) + value.join(' ') + '\n';
            } else {
                output += field.padEnd(14) + value + '\n';
            }
        }
        return output;
    }
}

module.exports = CronService;
