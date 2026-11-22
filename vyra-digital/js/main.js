// الرسم واللغة: يقرأ كل شيء من ملفات الإعدادات والترجمات
const mark = c => `<svg viewBox="0 0 48 48" fill="none" ${c || ''}><path d="M6 8h11l7 19 7-19h11L29 42H19z" fill="currentColor"/><path d="M31 8h11l-7 19z" fill="var(--a)"/></svg>`;

root.style.setProperty('--a', BRAND.accent);
let L = 'ar';
try { L = localStorage.getItem('vyra-lang') || 'ar'; } catch (e) {}

$('#lg').innerHTML = mark('style="width:30px;height:30px"');
$('#stack').innerHTML = mark() + mark() + mark();

function render() {
  const t = I18N[L];
  root.lang = L;
  root.dir = L === 'ar' ? 'rtl' : 'ltr';

  $$('[data-i]').forEach(e => e.textContent = t[e.dataset.i]);
  $$('[data-b]').forEach(e => e.textContent = BRAND.name);
  document.title = BRAND.full[L] + ' | ' + BRAND.category;
  $('#lang').textContent = t.lang;

  const ids = ['services', 'process', 'works', 'about', 'contact'];
  $('#nav').innerHTML = t.nav.map((n, i) => `<a href="#${ids[i]}">${n}</a>`).join('');

  $('#svc').innerHTML = SERVICES.filter(s => s.on).map(s => {
    const d = s[L];
    return `<article class="card tilt${s.big ? ' big' : ''}"><h3>${d[0]}</h3><p><strong>${t.prob}:</strong> ${d[1]}</p><b>${t.val}</b><p>${d[2]}</p></article>`;
  }).join('');

  $('#steps').innerHTML = PROCESS[L].map(s => `<div class="step"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');

  $('#wk').innerHTML = PROJECTS.map(p => `
    <article class="work tilt"><div class="art"></div>
      ${p.img ? `<img src="${p.img}" alt="${p.name[L]}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7">` : ''}
      <div class="in"><h3>${p.name[L]}</h3><span>${p.field[L]}</span>
        ${p.desc && p.desc[L] ? `<span>${p.desc[L]}</span>` : ''}
        ${p.url ? `<a class="btn sm" href="${p.url}" target="_blank" rel="noopener">${t.visit}</a>` : `<span class="tag">${t.soon}</span>`}
      </div></article>`).join('');

  $('#fn').textContent = FOUNDER.name[L];
  $('#fr').textContent = FOUNDER.role[L] + ' · ' + FOUNDER.city[L];
  $('#fb').textContent = FOUNDER.bio[L];

  const soc = [['LinkedIn', CONTACT.linkedin], ['GitHub', CONTACT.github], ...CONTACT.other].filter(x => x[1]);
  $('#fl').innerHTML = soc.map(x => `<a class="btn sm" href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join('');
  $('#ph').innerHTML = FOUNDER.photo
    ? `<img src="${FOUNDER.photo}" alt="${FOUNDER.name[L]}" loading="lazy">`
    : mark('style="width:40%;opacity:.4"');

  let c = '';
  if (CONTACT.whatsapp) c += `<a class="btn p mag" href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">${t.wa}</a>`;
  if (CONTACT.email)    c += `<a class="btn mag" href="mailto:${CONTACT.email}">${t.mail}</a>`;
  if (!c) c = `<span class="tag">${t.miss}</span>`;
  $('#cl').innerHTML = c;

  $('#ft').textContent = `© ${new Date().getFullYear()} ${BRAND.full[L]} · ${t.rights}`;
  bindMotion();
}

$('#lang').onclick = () => {
  L = L === 'ar' ? 'en' : 'ar';
  try { localStorage.setItem('vyra-lang', L); } catch (e) {}
  render();
};

render();
