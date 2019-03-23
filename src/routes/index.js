import express from 'express';
import { get, getBreeds, getSearchResults, getTypes } from '../controllers/search';

const searchRouter = express.Router();

// GET home page w/ search
searchRouter.get('/', get);
searchRouter.get('/getTypes', getTypes);
searchRouter.get('/getBreeds', getBreeds);
searchRouter.get('/getSearchResults', getSearchResults);

export default searchRouter;
