// module.exports = (hbs) => {
//     hbs.registerHelper('eachReverse', function (arr, options) {
//         return options.fn(this, {
//             data: options.data,
//             blockParams: arr.reverse()
//         });
//     });
// }

module.exports = (hbs) => {
    hbs.registerHelper('date', function (date) {
        longDate = new Date(date);
        hour = longDate.getHours();
        minute = longDate.getMinutes();

        if (minute < 10) minute = '0' + minute;

        year = longDate.getFullYear();
        month = longDate.getMonth()+1;
        dt = longDate.getDate();
        return `${hour}:${minute} - ${dt}/${month}/${year} ` 
        
    })
}