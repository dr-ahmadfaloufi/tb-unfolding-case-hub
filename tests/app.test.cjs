const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');

async function load(t, file, query = '', storage = 'normal') {
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8'), {
    url: `https://example.test/${file}${query}`, runScripts: 'outside-only', virtualConsole: console
  });
  t.after(() => dom.window.close());
  dom.window.scrollTo = () => {};
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  if (storage === 'denied') Object.defineProperty(dom.window, 'localStorage', {
    get() { throw new Error('Storage denied'); }
  });
  if (storage === 'write-denied') dom.window.Storage.prototype.setItem = () => { throw new Error('Quota exceeded'); };
  for (const name of ['data.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), dom.getInternalVMContext());
  }
  await new Promise(resolve => dom.window.document.addEventListener('DOMContentLoaded', resolve, { once: true }));
  return { dom, doc: dom.window.document, errors };
}

function click(doc, selector) {
  const button = doc.querySelector(selector);
  assert.ok(button, `Missing ${selector}`);
  assert.equal(button.disabled, false, `${selector} is disabled`);
  button.click();
}

function reveal(doc) {
  if (doc.querySelector('#mcq-show-btn')) click(doc, '#mcq-show-btn');
  if (doc.querySelector('#stage-mcq-check')) {
    click(doc, '.mcq-option');
    click(doc, '#stage-mcq-check');
  }
  click(doc, '#reveal-btn');
}

test('jumping to the final stage does not complete a case; completing remaining stages does', async t => {
  const { doc, errors } = await load(t, 'case.html', '?id=1');
  const count = doc.querySelectorAll('.stage-dot').length;
  click(doc, `[data-stage-index="${count - 1}"]`);
  reveal(doc);
  assert.equal(doc.querySelector('.case-complete'), null);
  for (let i = 0; i < count - 1; i++) {
    click(doc, `[data-stage-index="${i}"]`);
    reveal(doc);
  }
  assert.ok(doc.querySelector('.case-complete'));
  click(doc, '#restart-complete-btn');
  assert.equal(doc.querySelector('.case-complete'), null);
  assert.equal(doc.querySelectorAll('.stage-dot.revealed').length, 0);
  assert.deepEqual(errors, []);
});

test('all cases complete in sequence in normal and presenter modes', async t => {
  for (const presenter of [false, true]) {
    for (let id = 1; id <= 10; id++) {
      const { doc, errors } = await load(t, 'case.html', `?id=${id}${presenter ? '&presenter=1' : ''}`);
      const count = doc.querySelectorAll('.stage-dot').length;
      for (let i = 0; i < count; i++) {
        reveal(doc);
        assert.equal(Boolean(doc.querySelector('.case-complete')), i === count - 1);
        if (i < count - 1) click(doc, '#next-stage-btn');
      }
      assert.deepEqual(errors, []);
    }
  }
});

test('all pages initialize when storage access is denied', async t => {
  for (const [file, selector] of [['index.html', '.case-card'], ['case.html', '.stage-card'], ['start.html', '.mcq-option'], ['references.html', '.ref-item']]) {
    const { doc, errors } = await load(t, file, '', 'denied');
    assert.ok(doc.querySelector(selector));
    click(doc, '#presentation-checkbox');
    assert.ok(doc.body.classList.contains('presentation-mode'));
    assert.deepEqual(errors, []);
  }
});

test('presentation toggle remains usable when storage writes fail', async t => {
  const { doc, errors } = await load(t, 'index.html', '', 'write-denied');
  click(doc, '#presentation-checkbox');
  assert.ok(doc.body.classList.contains('presentation-mode'));
  click(doc, '#presentation-checkbox');
  assert.equal(doc.body.classList.contains('presentation-mode'), false);
  assert.deepEqual(errors, []);
});

test('presentation preference is saved when storage is available', async t => {
  const { dom, doc, errors } = await load(t, 'index.html');
  click(doc, '#presentation-checkbox');
  assert.equal(dom.window.localStorage.getItem('tbhub-presentation-mode'), '1');
  click(doc, '#presentation-checkbox');
  assert.equal(dom.window.localStorage.getItem('tbhub-presentation-mode'), '0');
  assert.deepEqual(errors, []);
});
