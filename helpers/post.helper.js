var markdown = require( "markdown" ).markdown;
const constants = require('../constants');


module.exports = (hbs) => {
/*     hbs.registerHelper('eachByRating', function (arr, options) {
        return options.fn(this, {
            data: options.data,
            blockParams: arr.reverse()
        });
    }); */

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

    hbs.registerHelper('dateTime', function (date) {
        dateTime = Date.parse(date);
        return dateTime
        
    })

    hbs.registerHelper('markdown', function (text) {
        md_content = text
        html_content = markdown.toHTML( md_content );
        return html_content
        
    })

    hbs.registerHelper('isAdmin', (user, options) => {
        if (user.role === constants.ROLE_ADMIN) {
        return options.fn(this);
        } else {
        return options.inverse(this);
        }
    })

    hbs.registerHelper('isOwner', (user, userSession, options) => {
        if (user.id === userSession.id) {
        return options.fn(this);
        } else {
        return options.inverse(this);
        }
    })

}

