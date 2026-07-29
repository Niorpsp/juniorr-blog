import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

let posts = [];
let nextPostId = 1;

app.get('/profiles', (req, res) => {
    return res.json({
        data: {
            name: 'john',
            age: 20,
        },
    });
});

app.post('/posts', (req, res) => {
    try {
        const { title, content, author, category, description } = req.body || {};

        if (!title || !content || !author || !category || !description) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: ['title', 'content', 'author', 'category', 'description'],
            });
        }

        const newPost = {
            id: nextPostId++,
            title,
            content,
            author,
            category,
            description,
            createdAt: new Date().toISOString(),
        };

        posts.push(newPost);

        return res.status(201).json({
            data: newPost,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message,
        });
    }
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
