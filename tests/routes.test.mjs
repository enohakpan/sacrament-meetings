import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import net from 'node:net';
import test, { after, before } from 'node:test';

let baseUrl;
let server;

async function getAvailablePort() {
  const socket = net.createServer();
  socket.listen(0, '127.0.0.1');
  await once(socket, 'listening');
  const { port } = socket.address();
  await new Promise((resolve, reject) => socket.close((error) => (error ? reject(error) : resolve())));
  return port;
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready (code ${server.exitCode}).`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  throw new Error('Next.js did not become ready within 30 seconds.');
}

before(async () => {
  const port = await getAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: process.cwd(),
    stdio: 'ignore',
  });
  await waitForServer(baseUrl);
});

after(async () => {
  if (server.exitCode === null) {
    if (process.platform === 'win32') {
      const killer = spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' });
      await once(killer, 'exit');
    } else {
      server.kill();
      await once(server, 'exit');
    }
  }
});

test('public page routes render successfully', async (t) => {
  const routes = [
    ['/', 'Sunday worship at a glance.'],
    ['/meetings', 'Upcoming meetings'],
    ['/meetings/1', 'Sunday, September 13, 2026'],
  ];

  for (const [route, expectedText] of routes) {
    await t.test(route, async () => {
      const response = await fetch(`${baseUrl}${route}`);
      assert.equal(response.status, 200);
      assert.match(await response.text(), new RegExp(expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    });
  }
});

test('current meeting route resolves to a valid meetings page', async () => {
  const response = await fetch(`${baseUrl}/meetings/current`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /NEXT_REDIRECT/);
});

test('invalid meeting route renders the not-found response', async () => {
  const response = await fetch(`${baseUrl}/meetings/999`);
  assert.match(await response.text(), /Meeting not found/);
});

test('create and edit routes render meeting forms', async (t) => {
  const routes = [
    ['/meetings/new', 'Create meeting'],
    ['/meetings/1/edit', 'Edit meeting #1'],
    ['/meetings/999/edit', 'Meeting not found'],
  ];

  for (const [route, expectedText] of routes) {
    await t.test(route, async () => {
      const response = await fetch(`${baseUrl}${route}`);
      assert.equal(response.status, 200);
      assert.match(await response.text(), new RegExp(expectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    });
  }
});

test('meeting API routes return data', async () => {
  const listResponse = await fetch(`${baseUrl}/api/meetings`);
  assert.equal(listResponse.status, 200);
  const meetings = await listResponse.json();
  assert.ok(Array.isArray(meetings));
  assert.ok(meetings.length > 0);

  const detailResponse = await fetch(`${baseUrl}/api/meetings/1`);
  assert.equal(detailResponse.status, 200);
  assert.equal((await detailResponse.json()).id, 1);
});

test('home page slider renders and every image resolves', async () => {
  const pageResponse = await fetch(baseUrl);
  const html = await pageResponse.text();
  const images = [
    '/hero-congregation-1.jpg',
    '/hero-congregation-2.png',
    '/hero-congregation-3.png',
  ];

  assert.match(html, /Show image 1 of 3/);

  for (const image of images) {
    assert.ok(html.includes(encodeURIComponent(image)), `${image} was not rendered by the slider.`);
    const imageResponse = await fetch(`${baseUrl}${image}`);
    assert.equal(imageResponse.status, 200);
    assert.match(imageResponse.headers.get('content-type') ?? '', /^image\//);
  }
});
