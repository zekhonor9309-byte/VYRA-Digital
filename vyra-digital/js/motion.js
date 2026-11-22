// الحركة والتفاعل: المؤشر، الإمالة ثلاثية الأبعاد، الأزرار المغناطيسية، حقل النقاط
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const root = document.documentElement;

const rm   = matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
let mx = -999, my = -999;

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('in');
}), { threshold: .2 });

const cur = $('#cur');
if (fine && !rm) {
  addEventListener('mousemove', e => {
    cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    const st = $('#stack');
    if (st) {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      st.style.transform = `rotateY(${x * 40}deg) rotateX(${-y * 30}deg)`;
    }
    mx = e.clientX; my = e.clientY;
  });
  addEventListener('mouseover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.tilt')));
}

// يُستدعى بعد كل إعادة رسم (تغيير اللغة)
function bindMotion() {
  if (rm) $$('.rv').forEach(e => e.classList.add('in'));
  else $$('.rv,.step').forEach(el => io.observe(el));

  $$('.tilt').forEach(el => {
    const reset = () => { el.style.transform = ''; };
    el.onpointermove = e => {
      if (rm || e.pointerType === 'touch') return;
      const b = el.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
      el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      const a = el.querySelector('.art');
      if (a) { a.style.setProperty('--x', (x + .5) * 100 + '%'); a.style.setProperty('--y', (y + .5) * 100 + '%'); }
    };
    el.onpointerleave = reset;
    el.onpointerdown = e => {
      if (e.pointerType === 'touch') { el.style.transform = 'scale(.98)'; setTimeout(reset, 180); }
    };
  });

  $$('.mag').forEach(el => {
    if (!fine || rm) return;
    el.onmousemove = e => {
      const b = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * .25}px,${(e.clientY - b.top - b.height / 2) * .35}px)`;
    };
    el.onmouseleave = () => { el.style.transform = ''; };
  });
}

// حقل النقاط في الهيرو: يتوقف خارج الشاشة
(function () {
  const cv = $('#fx'), x = cv.getContext('2d');
  let w, h, pts = [], run = false;
  const dpr = Math.min(devicePixelRatio || 1, 2);

  function size() {
    w = cv.width = cv.clientWidth * dpr;
    h = cv.height = cv.clientHeight * dpr;
    const g = Math.max(46 * dpr, Math.sqrt(w * h / (innerWidth < 700 ? 120 : 260)));
    pts = [];
    for (let i = 0; i < w; i += g) for (let j = 0; j < h; j += g) pts.push([i, j, i, j]);
  }
  function draw() {
    if (!run) return;
    x.clearRect(0, 0, w, h);
    const b = cv.getBoundingClientRect(), cx = (mx - b.left) * dpr, cy = (my - b.top) * dpr;
    x.fillStyle = getComputedStyle(root).getPropertyValue('--a');
    for (const p of pts) {
      const dx = p[0] - cx, dy = p[1] - cy, d = Math.hypot(dx, dy), f = Math.max(0, 1 - d / (220 * dpr));
      p[2] += ((p[0] + dx / (d || 1) * f * 50 * dpr) - p[2]) * .1;
      p[3] += ((p[1] + dy / (d || 1) * f * 50 * dpr) - p[3]) * .1;
      x.globalAlpha = .18 + f * .7;
      x.beginPath(); x.arc(p[2], p[3], (1.4 + f * 2.5) * dpr, 0, 6.3); x.fill();
    }
    requestAnimationFrame(draw);
  }
  size();
  addEventListener('resize', size);
  if (rm) {
    x.fillStyle = BRAND.accent; x.globalAlpha = .2;
    pts.forEach(p => { x.beginPath(); x.arc(p[0], p[1], 2 * dpr, 0, 6.3); x.fill(); });
    return;
  }
  new IntersectionObserver(e => { run = e[0].isIntersecting; if (run) draw(); }).observe(cv);
})();
