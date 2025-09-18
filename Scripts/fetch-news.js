// Automatically fetch and display news if fetchNewsBtn does not exist
window.addEventListener('DOMContentLoaded', function() {
   const container = document.getElementById('newsContainer');
   if (!container) return;
  // If fetchNewsBtn exists, use button click, else auto-fetch
  const fetchBtn = document.getElementById('fetchNewsBtn');
  if (fetchBtn) {
    fetchBtn.addEventListener('click', function() {
      container.innerHTML = '<em>Loading news...</em>';
      fetch('/api/news')
        .then(response => response.json())
        .then(data => {
          if (data.articles && data.articles.length > 0) {
            container.innerHTML = '<h2 style="color:#4a90e2;">Cybersecurity News</h2>' +
              data.articles.map(article => `
                <div style="display:flex;align-items:flex-start;margin-bottom:24px;background:#f4f4f4;padding:12px;border-radius:8px;">
                  <a href="${article.url}" target="_blank">
                    <img src="${article.urlToImage}" alt="News image" style="width:120px;height:auto;margin-right:18px;border-radius:6px;object-fit:cover;">
                  </a>
                  <div>
                    <a href="${article.url}" target="_blank" style="font-weight:bold;color:#4a90e2;font-size:1.15em;text-decoration:none;">${article.title}</a><br>
                    <span style="color:#222;font-size:1em;">${article.description || ''}</span><br>
                    <a href="${article.url}" target="_blank" style="color:#4a90e2;font-size:0.95em;word-break:break-all;">${article.url}</a>
                  </div>
                </div>
              `).join('');
          } else {
            container.innerHTML = '<em>No news found.</em>';
          }
        })
        .catch(error => {
          container.innerHTML = '<em>Error loading news.</em>';
        });
    });
  } else {
    // No button, auto-fetch
    container.innerHTML = '<em>Loading news...</em>';
    fetch('/api/news')
      .then(response => response.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          container.innerHTML = '<h2 style="color:#4a90e2;text-align:center;">Cybersecurity News</h2>' +
            data.articles.map(article => `
              <div style="display:flex;align-items:flex-start;margin-bottom:24px;background:#f4f4f4;padding:12px;border-radius:8px;">
                <a href="${article.url}" target="_blank">
                  <img src="${article.urlToImage}" alt="News image" style="width:120px;height:auto;margin-right:18px;border-radius:6px;object-fit:cover;">
                </a>
                <div>
                  <a href="${article.url}" target="_blank" style="font-weight:bold;color:#4a90e2;font-size:1.15em;text-decoration:none;">${article.title}</a><br>
                  <span style="color:#222;font-size:1em;">${article.description || ''}</span><br>
                  <a href="${article.url}" target="_blank" style="color:#4a90e2;font-size:0.95em;word-break:break-all;">${article.url}</a>
                </div>
              </div>
            `).join('');
        } else {
          container.innerHTML = '<em>No news found.</em>';
        }
      })
      .catch(error => {
        container.innerHTML = '<em>Error loading news.</em>';
      });
  }
});