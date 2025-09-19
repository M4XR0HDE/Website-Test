// Array to store all fetched articles
let allArticles = [];

function renderArticles(articles) {
  const container = document.getElementById('newsContainer');
  if (!articles || articles.length === 0) {
    container.innerHTML = '<em>No news found.</em>';
    return;
  }

  container.innerHTML =
    articles
      .map(
        (article) => `
      <div class="news-item" style="display:flex;align-items:flex-start;margin-bottom:24px;background:#f4f4f4;padding:12px;border-radius:8px;">
        <a href="${article.url}" target="_blank">
          <img src="${article.urlToImage}" alt="News image" style="width:120px;height:auto;margin-right:18px;border-radius:6px;object-fit:cover;">
        </a>
        <div>
          <a href="${article.url}" target="_blank" style="font-weight:bold;color:#4a90e2;font-size:1.15em;text-decoration:none;">${article.title}</a><br>
          <span style="color:#222;font-size:1em;">${article.description || ''}</span><br>
          <a href="${article.url}" target="_blank" style="color:#4a90e2;font-size:0.95em;word-break:break-all;">${article.url}</a>
        </div>
      </div>
    `
      )
      .join('');
}

function fetchAndRenderNews() {
  const container = document.getElementById('newsContainer');
  container.innerHTML = '<em>Loading news...</em>';

  fetch('/api/news')
    .then((response) => response.json())
    .then((data) => {
      if (data.articles && data.articles.length > 0) {
        allArticles = data.articles; // Save all articles
        renderArticles(allArticles);
      } else {
        container.innerHTML = '<em>No news found.</em>';
      }
    })
    .catch((error) => {
      container.innerHTML = '<em>Error loading news.</em>';
    });
}

window.addEventListener('DOMContentLoaded', function () {
  fetchAndRenderNews();

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function () {
      const term = searchInput.value.trim().toLowerCase();
      if (!term) {
        renderArticles(allArticles);
        return;
      }

      const filtered = allArticles.filter((article) => {
        return (
          (article.title && article.title.toLowerCase().includes(term)) ||
          (article.description &&
            article.description.toLowerCase().includes(term))
        );
      });

      if (filtered.length === 0) {
        alert('No results found.');
      }
      renderArticles(filtered);
    });

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
});


window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = "Search news...";
  }
});