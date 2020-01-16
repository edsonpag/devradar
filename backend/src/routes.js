const express = require('express');

const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');


const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/delete/:username', DevController.destroy);
routes.put('/update/:id', DevController.update);
routes.get('/search', SearchController.index);

module.exports = routes;