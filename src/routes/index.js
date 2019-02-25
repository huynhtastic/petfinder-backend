import express from 'express';
import { get, getFindParams } from '../controllers/search';

const searchRouter = express.Router();

// GET home page w/ search
searchRouter.get('/', get);
searchRouter.get('/getFindParams', getFindParams);

export default searchRouter;
