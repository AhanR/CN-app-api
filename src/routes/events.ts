import express from 'express'
import { addEvent, allEvents } from '../controllers/event';
const eventsRouter = express();

eventsRouter.post("/add", addEvent);
eventsRouter.get("/all", allEvents);

export default eventsRouter;