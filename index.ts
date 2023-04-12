import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {registrationRouter} from "./routers/registration.router";
import {signInRouter} from "./routers/signIn.router";
import {AppRouter} from "./routers/app.router";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());


app.use('/signin', signInRouter);
app.use('/signup', registrationRouter);
app.use('/app', AppRouter);


app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Aplikacja działą pod url: http://localhost:3001')
});