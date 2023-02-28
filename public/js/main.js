const socket = io();

socket.on('news', (data) => {
  const articles = data.articles;
  const articlesDiv = document.getElementById('articles');

  if (articlesDiv) {
    articlesDiv.innerHTML = '';

    articles.forEach((article) => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      const title = document.createElement('h3');
      title.textContent = article.title;
      articleDiv.appendChild(title);

      const description = document.createElement('p');
      description.textContent = article.description;
      articleDiv.appendChild(description);

      const image = document.createElement('img');
      image.src = article.urlToImage;
      articleDiv.appendChild(image);

      articlesDiv.appendChild(articleDiv);
    });
  }
});
