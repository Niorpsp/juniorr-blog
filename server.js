import express from 'express';
import cors from 'cors';
import connectionPool from './utils/db.mjs';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const posts = [];
let nextPostId = 1;

const users = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin',
        password: '123456',
    },
];
let nextUserId = 2;

app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = users.find((user) => user.email === normalizedEmail);
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered.' });
    }

    const newUser = {
        id: nextUserId++,
        name,
        email: normalizedEmail,
        password,
    };
    users.push(newUser);
    return res.status(201).json({ data: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase();
    const user = users.find((item) => item.email === normalizedEmail && item.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({ data: { id: user.id, name: user.name, email: user.email } });
});

app.get('/api/health', (req, res) => {
    return res.status(200).json({ message: 'OK' });
});

app.get('/api/profiles', (req, res) => {
    return res.json({
        data: {
            name: 'john',
            age: 20,
        },
    });
});

app.post('/api/posts', async (req, res) => {
    try {
        const newPost = req.body || {};
        const title = newPost.title;
        const content = newPost.content;
        const description = newPost.description || '';
        const author = newPost.author || 'Unknown';
        const category = newPost.category || 'General';
        const image = newPost.image || '';
        const category_id = newPost.category_id || 1;
        const status_id = newPost.status_id || 1;

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
            image,
            category_id,
            status_id,
            createdAt: new Date().toISOString(),
        };

        const hasDbConnection = Boolean(connectionPool);
        if (hasDbConnection) {
            const query = `INSERT INTO posts (title, image, category_id, description, content, status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
            const values = [title, image, category_id, description, content, status_id];
            const result = await connectionPool.query(query, values);
            createdPost.id = result.rows[0]?.id || createdPost.id;
        }

        posts.push(createdPost);
        return res.status(201).json({ data: createdPost });
    } catch (error) {
        return res.status(500).json({
            message: 'Server could not create post because database connection',
        });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const category = req.query.category || '';
        const keyword = req.query.keyword || '';
        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, Math.min(100, limit));
        const offset = (safePage - 1) * safeLimit;

        const hasDbConnection = Boolean(connectionPool);
        if (hasDbConnection) {
            let query = `SELECT posts.id, posts.image, categories.name AS category, posts.title, posts.description, posts.date, posts.content, statuses.status, posts.likes_count FROM posts INNER JOIN categories ON posts.category_id = categories.id INNER JOIN statuses ON posts.status_id = statuses.id`;
            let values = [];

            if (category && keyword) {
                query += ` WHERE categories.name ILIKE $1 AND (posts.title ILIKE $2 OR posts.description ILIKE $2 OR posts.content ILIKE $2)`;
                values = [`%${category}%`, `%${keyword}%`];
            } else if (category) {
                query += ` WHERE categories.name ILIKE $1`;
                values = [`%${category}%`];
            } else if (keyword) {
                query += ` WHERE posts.title ILIKE $1 OR posts.description ILIKE $1 OR posts.content ILIKE $1`;
                values = [`%${keyword}%`];
            }

            query += ` ORDER BY posts.date DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
            values.push(safeLimit, offset);

            const result = await connectionPool.query(query, values);

            let countQuery = `SELECT COUNT(*) FROM posts INNER JOIN categories ON posts.category_id = categories.id INNER JOIN statuses ON posts.status_id = statuses.id`;
            let countValues = values.slice(0, -2);
            if (category && keyword) {
                countQuery += ` WHERE categories.name ILIKE $1 AND (posts.title ILIKE $2 OR posts.description ILIKE $2 OR posts.content ILIKE $2)`;
            } else if (category) {
                countQuery += ` WHERE categories.name ILIKE $1`;
            } else if (keyword) {
                countQuery += ` WHERE posts.title ILIKE $1 OR posts.description ILIKE $1 OR posts.content ILIKE $1`;
            }

            const countResult = await connectionPool.query(countQuery, countValues);
            const totalPosts = parseInt(countResult.rows[0].count, 10);
            const responsePayload = {
                data: {
                    page: safePage,
                    limit: safeLimit,
                    totalPosts,
                    totalPages: Math.ceil(totalPosts / safeLimit),
                    posts: result.rows,
                },
            };
            if (offset + safeLimit < totalPosts) {
                responsePayload.data.nextPage = safePage + 1;
            }
            if (offset > 0) {
                responsePayload.data.previousPage = safePage - 1;
            }
            return res.status(200).json(responsePayload);
        }

        let filtered = [...posts];
        if (category) {
            filtered = filtered.filter((item) => item.category.toLowerCase() === category.toLowerCase());
        }
        if (keyword) {
            filtered = filtered.filter(
                (item) =>
                    item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.description.toLowerCase().includes(keyword.toLowerCase()) ||
                    item.content.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        const totalPosts = filtered.length;
        const startIndex = (safePage - 1) * safeLimit;
        const pageItems = filtered.slice(startIndex, startIndex + safeLimit);
        const responsePayload = {
            data: {
                page: safePage,
                limit: safeLimit,
                totalPosts,
                totalPages: Math.ceil(totalPosts / safeLimit),
                posts: pageItems,
            },
        };
        if (startIndex + safeLimit < totalPosts) {
            responsePayload.data.nextPage = safePage + 1;
        }
        if (startIndex > 0) {
            responsePayload.data.previousPage = safePage - 1;
        }
        return res.status(200).json(responsePayload);
    } catch (error) {
        return res.status(500).json({ message: 'Server could not retrieve posts' });
    }
});

app.get('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const hasDbConnection = Boolean(connectionPool);
        if (hasDbConnection) {
            const result = await connectionPool.query(
                `SELECT posts.id, posts.image, categories.name AS category, posts.title, posts.description, posts.date, posts.content, statuses.status, posts.likes_count FROM posts INNER JOIN categories ON posts.category_id = categories.id INNER JOIN statuses ON posts.status_id = statuses.id WHERE posts.id = $1`,
                [postId]
            );
            if (!result.rows[0]) {
                return res.status(404).json({ message: `Server could not find a requested post (post id: ${postId})` });
            }
            return res.status(200).json({ data: result.rows[0] });
        }

        const foundPost = posts.find((item) => String(item.id) === String(postId));
        if (!foundPost) {
            return res.status(404).json({ message: `Server could not find a requested post (post id: ${postId})` });
        }
        return res.status(200).json({ data: foundPost });
    } catch (error) {
        return res.status(500).json({ message: 'Server could not read post because database issue' });
    }
});

app.put('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        if (connectionPool) {
            const updatedPost = { ...req.body, date: new Date() };
            await connectionPool.query(
                `UPDATE posts SET title = $2, image = $3, category_id = $4, description = $5, content = $6, status_id = $7, date = $8 WHERE id = $1`,
                [
                    postId,
                    updatedPost.title,
                    updatedPost.image,
                    updatedPost.category_id,
                    updatedPost.description,
                    updatedPost.content,
                    updatedPost.status_id,
                    updatedPost.date,
                ]
            );
            return res.status(200).json({ message: 'Updated post successfully' });
        }

        const index = posts.findIndex((item) => String(item.id) === String(postId));
        if (index === -1) {
            return res.status(404).json({ message: `Server could not find a requested post (post id: ${postId})` });
        }
        const updatedFields = req.body || {};
        posts[index] = {
            ...posts[index],
            ...updatedFields,
            updatedAt: new Date().toISOString(),
        };
        return res.status(200).json({ data: posts[index] });
    } catch (error) {
        return res.status(500).json({ message: 'Server could not update post because database connection' });
    }
});

app.delete('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        if (connectionPool) {
            const result = await connectionPool.query(`DELETE FROM posts WHERE id = $1 RETURNING id`, [postId]);
            if (!result.rowCount) {
                return res.status(404).json({ message: `Server could not find a requested post (post id: ${postId})` });
            }
            return res.status(200).json({ message: 'Post deleted successfully' });
        }

        const index = posts.findIndex((item) => String(item.id) === String(postId));
        if (index === -1) {
            return res.status(404).json({ message: `Server could not find a requested post (post id: ${postId})` });
        }
        posts.splice(index, 1);
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server could not delete post because database connection' });
    }
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

const shouldListen = !process.env.VERCEL && process.env.NODE_ENV !== 'test';
if (shouldListen) {
    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
}

export default app;
export { app };
