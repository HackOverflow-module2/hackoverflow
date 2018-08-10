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

    hbs.registerHelper('dateTime', function(date) {
        dateTime = Date.parse(date);
        return dateTime
        
    })

    hbs.registerHelper('markdown', function(text) {
        md_content = text
        html_content = markdown.toHTML( md_content );
        return html_content
        
    })

    hbs.registerHelper('isAdmin', function(user, options){
        if (user.role === constants.ROLE_ADMIN) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

    hbs.registerHelper('isOwner', function(user, userSession, options) {
        if (user.id === userSession.id) {
            console.log('El this --> ', this)
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

    hbs.registerHelper('angelicSentiment', function(sentiment, options) {
        if (sentiment >= 4) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

    hbs.registerHelper('positiveSentiment', function(sentiment, options) {
        if (sentiment > 0 && sentiment < 4) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

    hbs.registerHelper('neutralSentiment', function(sentiment, options) {
        if (sentiment === 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

    hbs.registerHelper('badSentiment', function(sentiment, options) {
        if (sentiment < 0 && sentiment > -4) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

    hbs.registerHelper('haterSentiment', function(sentiment, options) {
        if (sentiment <= -4) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    })

}

