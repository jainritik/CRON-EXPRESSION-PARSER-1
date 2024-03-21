class CronParser {
    static parseField(field, low, high) {
        if (field === '*') {
            return this.parseAllValues(low, high);
        }

        if (field.includes(',')) {
            return this.parseMultipleValues(field, low, high);
        }

        if (field.includes('/')) {
            return this.parseStepValues(field, low, high);
        }

        if (field.includes('-')) {
            return this.parseRangeValues(field, low, high);
        }

        return this.parseSingleValue(field, low, high);
    }

    static parseAllValues(low, high) {
        return Array.from({ length: high - low + 1 }, (_, index) => low + index);
    }

    static parseMultipleValues(field, low, high) {
        const values = field.split(',').map(value => this.parseSingleValue(value, low, high)).flat();
        return [...new Set(values)];
    }

    static parseStepValues(field, low, high) {
        const [start, step] = field.split('/').map(value => parseInt(value));
        const values = [];
        let startValue = 0;
        if (field.charAt(field.indexOf("/") - 1) === '*') {
            startValue = low;
        } else {
            startValue = parseInt(field.substring(0, field.indexOf("/")));
        }
        for (let i = startValue; i <= high; i += step) {
            values.push(i % (high + 1));
        }
        return values;
    }

    static parseRangeValues(field, low, high) {
        const [start, end] = field.split('-').map(value => parseInt(value));
        const values = [];
        for (let i = start; i <= end; i++) {
            values.push(i % (high + 1));
        }
        return values;
    }

    static parseSingleValue(field, low, high) {
        const value = parseInt(field);
        return isNaN(value) || value < low || value > high ? [] : [value];
    }
}

module.exports = CronParser;
