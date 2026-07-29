import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get('/profiles', (req, res) => {
    return res.json({
        data: {
            name: 'john',
            age: 20,
        },
    });
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
}

export { app };
