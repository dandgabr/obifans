const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
class Element {
  constructor() { this.children = []; this.listeners = {}; this.dataset = {}; this.classList = { toggle() {}, remove() {}, add() {} }; }
  append(...nodes) { this.children.push(...nodes); }
  prepend(node) { this.children.unshift(node); const parent = this; node.replaceWith = function(other) { parent.children[parent.children.indexOf(this)] = other; other.replaceWith = this.replaceWith; }; }
  querySelector() { return this.children[0]; }
  getAttribute(k) { return this[k]; }
  replaceChildren() { this.children = []; }
  setAttribute(k, v) { this[k] = v; }
  addEventListener(k, fn) { this.listeners[k] = fn; }
  scrollIntoView() {}
  showModal() { this.open = true; }
  close() { this.open = false; }
}
const selectors = ['#feed-grid', '#gallery-status', '#daily-image', '#daily-description', '#daily-error', '#random', '#checkout', '#checkout-open', '#checkout-close', '#checkout-cancel', '#unlock', '#exclusive', '#unlock-status', '#motion-toggle'];
const elements = Object.fromEntries(selectors.map(s => [s, new Element()]));
const filters = ['all', 'photo', 'video'].map(f => { const e = new Element(); e.dataset.filter = f; return e; });
const document = { querySelector: s => elements[s], querySelectorAll: () => filters, createElement: () => new Element(), addEventListener() {}, body: new Element() };
let now = new Date(2026, 0, 15, 12).getTime();
class FixedDate extends Date { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } }
let timer;
const context = { document, Date: FixedDate, Math, setTimeout: (fn, delay) => { timer = { fn, delay }; }, clearTimeout() {}, matchMedia: () => ({ matches: true }) };
vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), context);
assert.equal(elements['#feed-grid'].children.length, 11);
const seen = new Set();
let previous;
for (let day = 15; day < 37; day++) {
  now = new Date(2026, 0, day, 0).getTime();
  assert.ok(timer.delay > 0 && timer.delay <= 86400000);
  timer.fn();
  const media = elements['#daily-image'].children[0];
  assert.ok(media && /^(fotos\/[1-8]\.jpeg|videos\/(9|1|2)\.mp4)$/.test(media.src));
  assert.notEqual(media.src, previous);
  previous = media.src; seen.add(media.src);
  const description = elements['#daily-description'];
  if (media.src.startsWith('videos/')) {
    const post = elements['#feed-grid'].children.find(p => p.children[0].src === media.src);
    assert.equal(description.textContent, post.children[2].textContent);
    assert.match(description.textContent, /áudio não foi transcrito/);
  } else assert.equal(description.textContent, '');
  assert.ok(media.listeners.error, 'mídia do destaque deve tratar erro');
  media.listeners.error();
  assert.match(elements['#daily-error'].textContent, /não foi possível carregar/i);
  timer.fn();
  assert.equal(elements['#daily-image'].children[0].src, previous);
}
assert.equal(seen.size, 11);
filters[1].listeners.click(); assert.equal(elements['#feed-grid'].children.length, 8);
filters[2].listeners.click(); assert.equal(elements['#feed-grid'].children.length, 3);
elements['#checkout-open'].listeners.click(); assert.equal(elements['#checkout'].open, true);
elements['#unlock'].listeners.click(); assert.equal(elements['#checkout'].open, false); assert.equal(elements['#exclusive'].hidden, false); assert.match(elements['#unlock-status'].textContent, /desbloqueado/);
console.log('OK: destaque diário, filtros e checkout');
