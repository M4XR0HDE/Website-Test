// Listen for button click to fetch news
document.getElementById('fetchNewsBtn').addEventListener('click', function() {
  const container = document.getElementById('newsContainer');
  container.innerHTML = '<em>Loading news...</em>';
  // Fetch news from Flask API
  fetch('/api/news')
    .then(response => response.json())
    .then(data => {
      // If articles are found, display them
      //<!-- Comment that wont be shown in the html syntax -->
      if (data.articles && data.articles.length > 0) {
        container.innerHTML = '<h2 style="color:#4a90e2;">Cybersecurity News</h2>' +
          data.articles.map(article => `
            <div style="display:flex;align-items:flex-start;margin-bottom:24px;background:#f4f4f4;padding:12px;border-radius:8px;">
              <!-- Clickable image linking to the article. alt(alternative) is used to display smth if pic doesnt exist or failed to load, margin-right is used to create space between the image and the text, object-fit is used to specify how the image should be resized to fit its container -->
              <a href="${article.url}" target="_blank">
                <img src="${article.urlToImage}" alt="News image" style="width:120px;height:auto;margin-right:18px;border-radius:6px;object-fit:cover;">
              </a>
              <div>
                <!-- Clickable title linking to the article. text-decoration can be used to example add underlines -->
                <a href="${article.url}" target="_blank" style="font-weight:bold;color:#4a90e2;font-size:1.15em;text-decoration:none;">${article.title}</a><br>
                <!-- Description text for the article. -->
                <span style="color:#222;font-size:1em;">${article.description || ''}</span><br>
                <!-- Article URL below description. word-break to wrap onto the next line if too big -->
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
