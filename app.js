const descriptions = ['Obiwan deitado no sofá, ao lado de um cobertor azul.', 'Close de perfil de Obiwan olhando para cima.', 'Obiwan deitado sobre uma cama, com a cabeça apoiada na colcha.', 'Obiwan em pé dentro de casa, olhando para o lado com a boca aberta.', 'Obiwan sentado ao ar livre, usando uma bandana amarela.', 'Obiwan sentado ao ar livre, entre árvores, com bandana amarela.', 'Obiwan sentado no sofá com um brinquedo de pelúcia.', 'Obiwan no sofá, com um brinquedo de pelúcia entre as patas.'];
const photos = Array.from({ length: 8 }, (_, i) => ({ type: 'photo', alt: descriptions[i], src: `fotos/${i + 1}.jpeg`, title: ['Um oi do Obi', 'Pequenos momentos', 'Carinha de amor', 'Meu melhor ângulo', 'Dia de fofura', 'Só passando para alegrar', 'Pose para a foto', 'Muito amor por aqui'][i] }));
const videos = [{ type: 'video', src: 'videos/9.mp4', title: 'Um momento com Obi' }, { type: 'video', src: 'videos/1.mp4', title: 'Mais uma aventura' }, { type: 'video', src: 'videos/2.mp4', title: 'Obi em movimento' }];
const items = [...photos, ...videos];
const videoDescriptions = { 'videos/9.mp4': 'Obiwan brinca na cama com um brinquedo vermelho.', 'videos/1.mp4': 'Obiwan está deitado no sofá.', 'videos/2.mp4': 'Obiwan está em pé dentro de casa.' };
const videoDescription = item => `${videoDescriptions[item.src]} O áudio não foi transcrito.`;
const grid = document.querySelector('#feed-grid');
const status = document.querySelector('#gallery-status');
let filter = 'all';
let unlocked = false;

function render() {
  grid.replaceChildren();
  items.filter(item => filter === 'all' || item.type === filter).forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'post';
    const media = document.createElement(item.type === 'photo' ? 'img' : 'video');
    media.src = item.src;
    if (item.type === 'photo') { media.alt = item.alt; media.loading = 'lazy'; }
    else { media.controls = true; media.preload = 'metadata'; media.setAttribute('aria-label', item.title); }
    const caption = document.createElement('div');
    caption.className = 'post-caption';
    const title = document.createElement('strong'); title.textContent = item.title;
    const kind = document.createElement('span'); kind.textContent = item.type === 'photo' ? 'FOTO ♡' : 'VÍDEO ▶';
    caption.append(title, kind); article.append(media, caption);
    if (item.type === 'video') { const description = document.createElement('p'); description.className = 'video-description'; description.textContent = videoDescription(item); article.append(description); }
    grid.append(article);
  });
}
render();
// ponytail: local calendar dates define the daily pick; use a server clock if every timezone must agree.
let dailyTimer;
let dailyInitialized = false;
function updateDaily() {
  const now = new Date();
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const daily = items[((day % items.length) + items.length) % items.length];
  const container = document.querySelector('#daily-image');
  const current = container.querySelector('img, video');
  if (!dailyInitialized || !current || current.getAttribute('src') !== daily.src) {
    dailyInitialized = true;
    const media = document.createElement(daily.type === 'photo' ? 'img' : 'video');
    document.querySelector('#daily-description').textContent = daily.type === 'video' ? videoDescription(daily) : '';
    const error = document.querySelector('#daily-error');
    error.textContent = '';
    media.addEventListener('error', () => { error.textContent = 'Não foi possível carregar a mídia do destaque diário.'; });
    media.src = daily.src;
    if (daily.type === 'photo') media.alt = daily.alt;
    else { media.controls = true; media.preload = 'metadata'; media.setAttribute('aria-label', daily.title); }
    if (current) current.replaceWith(media); else container.prepend(media);
  }
  clearTimeout(dailyTimer);
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  dailyTimer = setTimeout(updateDaily, midnight - now);
}
updateDaily();
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateDaily(); });
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(b => { const selected = b === button; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
  render(); status.textContent = `${grid.children.length} publicações exibidas.`;
}));
document.querySelector('#random').addEventListener('click', () => {
  const posts = [...grid.children];
  const post = posts[Math.floor(Math.random() * posts.length)];
  post.classList.remove('chosen'); void post.offsetWidth; post.classList.add('chosen');
  post.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  status.textContent = `Sorteado: ${post.querySelector('strong').textContent}.`;
});
const dialog = document.querySelector('#checkout');
const openButton = document.querySelector('#checkout-open');
openButton.addEventListener('click', () => dialog.showModal());
document.querySelector('#checkout-close').addEventListener('click', () => dialog.close());
document.querySelector('#checkout-cancel').addEventListener('click', () => dialog.close());
document.querySelector('#unlock').addEventListener('click', () => {
  unlocked = true;
  document.querySelector('#exclusive').hidden = !unlocked;
  openButton.textContent = 'Carinho desbloqueado ♡';
  dialog.close();
  document.querySelector('#unlock-status').textContent = 'Carinho desbloqueado. Você faz parte da matilha!';
  document.querySelector('#exclusive').scrollIntoView({ block: 'nearest' });
});

const motionButton = document.querySelector('#motion-toggle');
motionButton.addEventListener('click', () => {
  const paused = document.body.classList.toggle('motion-paused');
  motionButton.textContent = paused ? 'Retomar animações' : 'Pausar animações';
  motionButton.setAttribute('aria-pressed', String(paused));
});
