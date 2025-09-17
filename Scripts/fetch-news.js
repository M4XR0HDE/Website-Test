document.getElementById('fetchNewsBtn').addEventListener('click', function() {
  const container = document.getElementById('newsContainer');
  container.innerHTML = '<em>Loading news...</em>';
  fetch('/api/news')
    .then(response => response.json())
    .then(data => {
      // Display all information from /api/news
      container.innerHTML = '<h2 style="color:#4a90e2;">Raw NewsAPI Response</h2>' +
        `<pre style="text-align:left;white-space:pre-wrap;background:#f4f4f4;padding:12px;border-radius:8px;color:#4a90e2;">${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(error => {
      container.innerHTML = '<em>Error loading news.</em>';
      console.error('Fetch error:', error);
    });
});
