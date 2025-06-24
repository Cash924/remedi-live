const API_KEY       = 'AIzaSyDO1WVseaXnkCGYhp7IJgaL9GFc_xdECwU';
const VIDEO_ID      = 'oELUIO3nIO8';
// we’ll hold onto the Swiper instance here
let testimonialsSwiper = null;

async function fetchAllComments(pageToken = '') {
  const params = new URLSearchParams({
    part:       'snippet',
    videoId:    VIDEO_ID,
    maxResults: '100',
    key:        API_KEY
  });
  if (pageToken) params.set('pageToken', pageToken);
  const res  = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?${params}`
  );
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  if (json.nextPageToken) {
    return json.items.concat(await fetchAllComments(json.nextPageToken));
  }
  return json.items;
}

async function loadYouTubeTestimonials() {
  const wrapper = document.getElementById('testimonialsWrapper');
  wrapper.innerHTML = '';

  try {
    const items = await fetchAllComments();

    items.forEach(item => {
      const c = item.snippet.topLevelComment.snippet;
      const slide = document.createElement('div');
      slide.className = 'swiper-slide s-testimonials__slide';
      slide.innerHTML = `
        <div class="s-testimonials__author">
          <img src="${c.authorProfileImageUrl}"
               alt="${c.authorDisplayName}"
               class="s-testimonials__avatar">
          <cite class="s-testimonials__cite">
            <strong>${c.authorDisplayName}</strong>
            <span>YouTube Fan</span>
          </cite>
        </div>
        <p>${c.textDisplay}</p>
      `;
      wrapper.appendChild(slide);
    });

    if (!testimonialsSwiper) {
     testimonialsSwiper = new Swiper('.s-testimonials__slider', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  loopedSlides: 5, // should match or be less than your real slides
  speed: 600,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.5,
    }
  }
});

    } else {
      testimonialsSwiper.update();
    }
  }
  catch (err) {
    console.error('YT comments error:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadYouTubeTestimonials);