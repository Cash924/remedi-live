// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/works.json')
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(works => {
      const container = document.getElementById('worksContainer');
      works.forEach(work => {
        const card = document.createElement('div');
        card.className = 'column entry';
        const inner = `
          <div class="entry__thumb">
            <img src="${work.thumb}" alt="${work.title}">
          </div>
          <div class="entry__info">
            <h4 class="entry__title">${work.title}</h4>
            <div class="entry__cat">
              ${work.category}
              ${work.songUrl ? `<span class="entry__listen-inline">▶ Listen</span>` : ''}
            </div>
          </div>
        `;
        if (work.songUrl) {
          card.innerHTML = `<a href="${work.songUrl}" target="_blank" class="entry__link-full">${inner}</a>`;
        } else {
          card.innerHTML = inner;
        }
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading works:', err));
});
