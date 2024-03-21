class CronExpression {
    constructor(minute, hour, dayOfMonth, month, dayOfWeek, command) {
      this.minute = minute;
      this.hour = hour;
      this.dayOfMonth = dayOfMonth;
      this.month = month;
      this.dayOfWeek = dayOfWeek;
      this.command = command;
    }
  }
  
  module.exports = CronExpression;
  