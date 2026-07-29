import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';

process.env.NODE_ENV = 'test';
process.env.DB_PATH = ':memory:';

const { app } = await import('../server.js');

test('POST /posts creates a new post', async () => {
    const server = app.listen(0);
    await once(server, 'listening');

    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;

    try {
        const response = await fetch(`http://127.0.0.1:${port}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'My first post',
                content: 'This is a test post',
                author: 'John',
                category: 'General',
                description: 'A short summary',
            }),
        });

        const payload = await response.json();

        assert.equal(response.status, 201);
        assert.equal(payload.data.title, 'My first post');
        assert.equal(payload.data.author, 'John');
        assert.equal(payload.data.category, 'General');
        assert.ok(Number.isInteger(payload.data.id));
    } finally {
        server.close();
    }
});
