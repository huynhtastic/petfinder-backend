import express from 'express';
import { get, getBreeds, getSearchResults, getTypes } from '../controllers/search';
import { changeDB, insertIntoDB, deleteFromDB } from '../controllers/db';
// TODO: cut out db methods into separate router

const searchRouter = express.Router();

// GET home page w/ search
searchRouter.get('/', get);
searchRouter.get('/getTypes', getTypes);
searchRouter.get('/getBreeds', getBreeds);
searchRouter.get('/getSearchResults', getSearchResults);
searchRouter.post('/insert', insertIntoDB);
searchRouter.post('/delete', deleteFromDB);
searchRouter.post('/change', changeDB);

export default searchRouter;
