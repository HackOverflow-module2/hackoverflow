const hbs = require('hbs');
const path = require('path');

require('../helpers/post.helper')(hbs);

hbs.registerPartials(path.join(__dirname, '../views/partials'));

