const sections = [
  ['all', 'All'],
  ['breakfast', 'Breakfast'],
  ['mains', 'Main Dishes'],
  ['noodles', 'Noodles & Rice'],
  ['snacks', 'Snacks'],
  ['vegetarian', 'Vegetarian'],
  ['dessert', 'Desserts'],
  ['drinks', 'Beverages']
];

const pages = [
  { p: 2, s: 'breakfast', t: 'Breakfast Set', n: 'A perfect start to your morning' },
  { p: 3, s: 'breakfast', t: 'All-Day Breakfast', n: 'Breakfast favourites, served all day' },
  { p: 4, s: 'mains', t: 'Truly Malaysian', n: 'Local flavours close to the heart' },
  { p: 5, s: 'noodles', t: 'Fried Favourites', n: 'Fresh from the wok and full of flavour' },
  { p: 6, s: 'noodles', t: 'Noodles', n: 'Popular soup and dry noodle selections' },
  { p: 7, s: 'mains', t: 'Rice & Add-Ons', n: 'Build your meal just the way you like it' },
  { p: 8, s: 'snacks', t: 'Snack Selection', n: 'Perfect for sharing or enjoying on your own' },
  { p: 9, s: 'snacks', t: 'Local Snacks', n: 'Classic kopitiam favourites with a nostalgic touch' },
  { p: 10, s: 'vegetarian', t: 'Vegetarian', n: 'Wholesome choices full of flavour' },
  { p: 11, s: 'dessert', t: 'Desserts', n: 'Sweet, chilled and refreshing' },
  { p: 12, s: 'dessert', t: 'Dessert of the Day', n: 'A special treat to complete your meal' },
  { p: 13, s: 'drinks', t: 'Beverages', n: 'Coffee, tea and everyday favourites' },
  { p: 14, s: 'drinks', t: 'Cold Beverages', n: 'Cool and refreshing drinks for any time of day' }
];

let active = 'all';

const filters = document.querySelector('#filters');
const grid = document.querySelector('#grid');
const viewer = document.querySelector('#viewer');

function renderFilters() {
  filters.innerHTML = sections
    .map(([id, label]) =>
      `<button data-id="${id}" class="${id === active ? 'active' : ''}">${label}</button>`
    )
    .join('');

  filters.querySelectorAll('button').forEach(button => {
    button.onclick = () => {
      active = button.dataset.id;
      renderFilters();
      renderGrid();
    };
  });
}

function renderGrid() {
  const shown = active === 'all'
    ? pages
    : pages.filter(item => item.s === active);

  grid.innerHTML = shown
    .map(item => `
      <button class="card" data-page="${item.p}">
        <img
          loading="lazy"
         src="page-${String(item.p).padStart(2, '0')}.webp"
          alt="${item.t} menu"
        >
        <span class="overlay"></span>
        <span class="num">${String(item.p - 1).padStart(2, '0')}</span>
        <span class="copy">
          <small>${item.n}</small>
          <b>${item.t}</b>
          <i>View Full Menu →</i>
        </span>
      </button>
    `)
    .join('');

  grid.querySelectorAll('.card').forEach(card => {
    card.onclick = () =>
      openMenu(pages.find(item => item.p == card.dataset.page));
  });
}

function openMenu(item) {
  document.querySelector('#viewerTitle').textContent = item.t;
  document.querySelector('#viewerImg').src =
   `page-${String(item.p).padStart(2, '0')}.webp`

  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeViewer() {
  viewer.hidden = true;
  document.body.style.overflow = '';
}

document.querySelector('#closeViewer').onclick = closeViewer;

viewer.onclick = event => {
  if (event.target === viewer) closeViewer();
};

const mobileNav = document.querySelector('#mobileNav');

document.querySelector('#navBtn').onclick = () => {
  mobileNav.hidden = false;
  document.body.style.overflow = 'hidden';
};

document.querySelector('#closeNav').onclick = () => {
  mobileNav.hidden = true;
  document.body.style.overflow = '';
};

mobileNav.querySelectorAll('a').forEach(link => {
  link.onclick = () => {
    mobileNav.hidden = true;
    document.body.style.overflow = '';
  };
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeViewer();
    mobileNav.hidden = true;
  }
});

renderFilters();
renderGrid();
