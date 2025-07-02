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
          <!-- Text info removed -->
        `;

        // Always wrap in link to retain hover effect
        card.innerHTML = `
          <a href="${work.songUrl || '#'}" target="_blank" class="entry__link-full">
            ${inner}
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading works:', err));
});
