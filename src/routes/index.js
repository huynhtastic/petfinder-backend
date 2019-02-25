import express from 'express';
import { get } from '../controllers/search';

const searchRouter = express.Router();

// GET home page w/ search
searchRouter.get('/', get);

export default searchRouter;
