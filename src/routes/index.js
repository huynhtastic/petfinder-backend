import express from 'express';
import { get, getTypes } from '../controllers/search';

const searchRouter = express.Router();

// GET home page w/ search
searchRouter.get('/', get);
searchRouter.get('/getTypes', getTypes);

export default searchRouter;
