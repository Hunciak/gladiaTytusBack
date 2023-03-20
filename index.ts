import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {registrationRouter} from "./routers/registration.router";
import {signInRouter} from "./routers/signIn.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use((req,res,next)=>{console.log(req.body); next()}
)

app.use('/signin', signInRouter);
app.use('/signup', registrationRouter);


app.all("*", (req, res, next) => {
    console.log('jestem')
    res.json('dupa')
});

app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Aplikacja działą pod url: http://localhost:3001')
});