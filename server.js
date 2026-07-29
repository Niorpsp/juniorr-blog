import express from 'express';
import cors from 'cors';
import connectionPool from './utils/db.mjs';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const posts = [];
let nextPostId = 1;

app.get('/health', (req, res) => {
    return res.status(200).json({ message: 'OK' });
});

app.get('/profiles', (req, res) => {
    return res.json({
        data: {
            name: 'john',
            age: 20,
        },
    });
});

app.post('/posts', async (req, res) => {
    try {
        const newPost = req.body || {};
        const title = newPost.title;
        const content = newPost.content;
        const description = newPost.description || '';
        const author = newPost.author || 'Unknown';
        const category = newPost.category || 'General';

        if (!title || !content || !description) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: ['title', 'content', 'description'],
            });
        }

        const createdPost = {
            id: nextPostId++,
            title,
            content,
            description,
            author,
            category,
            createdAt: new Date().toISOString(),
        };

        posts.push(createdPost);

        const hasDbConnection = Boolean(connectionPool);

        if (hasDbConnection) {
            const query = `
                insert into posts (title, image, category_id, description, content, status_id)
                values ($1, $2, $3, $4, $5, $6)
            `;

            const values = [
                title,
                newPost.image || '',
                newPost.category_id || 1,
                description,
                content,
                newPost.status_id || 1,
            ];

            await connectionPool.query(query, values);
        }

        return res.status(201).json({ data: createdPost });
    } catch (error) {
        return res.status(500).json({
            message: 'Server could not create post because database connection',
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
