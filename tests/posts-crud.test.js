import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';

const { app } = await import('../server.js');

const createPostPayload = {
    title: 'CRUD Test Post',
    content: 'This is a full CRUD test post.',
    author: 'Tester',
    category: 'Tech',
    description: 'A post for testing CRUD operations.',
};

let server;
let baseUrl;

async function startServer() {
    server = app.listen(0);
    await once(server, 'listening');
    const address = server.address();
    baseUrl = `http://127.0.0.1:${typeof address === 'object' && address ? address.port : 0}`;
}

async function stopServer() {
    if (server) server.close();
}

test('POST /posts creates a post', async () => {
    await startServer();

    const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPostPayload),
    });

    const payload = await response.json();
    assert.equal(response.status, 201);
    assert.equal(payload.data.title, createPostPayload.title);
    assert.equal(payload.data.author, createPostPayload.author);
    assert.equal(payload.data.category, createPostPayload.category);
    await stopServer();
});

test('GET /posts/:postId returns the created post', async () => {
    await startServer();

    const postResponse = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPostPayload),
    });
    const postPayload = await postResponse.json();
    const postId = postPayload.data.id;

    const response = await fetch(`${baseUrl}/posts/${postId}`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.data.id, postId);
    await stopServer();
});

test('GET /posts returns posts list with pagination and filtering', async () => {
    await startServer();

    await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPostPayload),
    });

    const response = await fetch(`${baseUrl}/posts?page=1&limit=5&category=Tech&keyword=CRUD`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(payload.data.posts));
    assert.equal(payload.data.page, 1);
    await stopServer();
});

test('PUT /posts/:postId updates the post', async () => {
    await startServer();

    const postResponse = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPostPayload),
    });
    const postPayload = await postResponse.json();
    const postId = postPayload.data.id;

    const updateResponse = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated Title' }),
    });
    const updatePayload = await updateResponse.json();

    assert.equal(updateResponse.status, 200);
    assert.equal(updatePayload.data.title, 'Updated Title');
    await stopServer();
});

test('DELETE /posts/:postId deletes the post', async () => {
    await startServer();

    const postResponse = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPostPayload),
    });
    const postPayload = await postResponse.json();
    const postId = postPayload.data.id;

    const deleteResponse = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
    });
    const deletePayload = await deleteResponse.json();

    assert.equal(deleteResponse.status, 200);
    assert.equal(deletePayload.message, 'Post deleted successfully');
    await stopServer();
});
