// Pestañas por perfil de decisor. El hash de la URL (#it, #marketing…) abre directamente ese perfil.
const tabs = document.querySelectorAll('.tabs button');
const panels = document.querySelectorAll('.role');
const ids = [...panels].map(p => p.id);

function show(id, scroll) {
  tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.role === id));
  panels.forEach(p => { p.hidden = p.id !== id; });
  if (scroll) document.getElementById('interlocutores').scrollIntoView();
}

tabs.forEach(t => t.addEventListener('click', () => {
  show(t.dataset.role);
  history.replaceState(null, '', '#' + t.dataset.role);
}));

const initial = location.hash.slice(1);
show(ids.includes(initial) ? initial : ids[0], ids.includes(initial));

// Enlaces y formulario aún sin conectar.
document.querySelectorAll('a[data-pending]').forEach(a =>
  a.addEventListener('click', e => e.preventDefault()));
const form = document.querySelector('form[data-pending]');
form?.addEventListener('submit', e => {
  e.preventDefault();
  form.querySelector('.form-note').hidden = false;
});

// Los botones de "Trabajar juntos" preseleccionan el motivo en el formulario.
document.querySelectorAll('[data-motivo]').forEach(a => a.addEventListener('click', () => {
  const select = document.querySelector('select[name="motivo"]');
  if (select) select.value = a.dataset.motivo;
}));
