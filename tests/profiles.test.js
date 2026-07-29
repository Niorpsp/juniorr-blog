import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';

const { app } = await import('../server.js');

test('GET /profiles returns John profile', async () => {
    const server = app.listen(0);
    await once(server, 'listening');

    const address = server.address();
    const port = typeof address === 'object' && address ? address.port : 0;

    try {
        const response = await fetch(`http://127.0.0.1:${port}/profiles`);
        const payload = await response.json();

        assert.equal(response.status, 200);
        assert.equal(payload.data.name, 'john');
        assert.equal(payload.data.age, 20);
    } finally {
        server.close();
    }
});
