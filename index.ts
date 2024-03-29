import express from 'express';
import cors from 'cors';
import 'express-async-errors';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.listen(3001, '0.0.0.0', () => {
    console.log('Aplikacja działą pod url: http://localhost:3001')
});