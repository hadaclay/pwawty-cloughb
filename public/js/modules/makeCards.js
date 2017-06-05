// Generate HTML from search JSON
function makeCards(bars) {
  let output = [];
  // build columns from every result
  let html = bars.map(bar => {
    return `
      <div class="column is-4">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <a href="${bar.url}">
                <img src="${bar.image_url}">
              </a>
            </figure>
          </div>
          <div class="card-content has-text-centered">
            <h3 class="title is-3">${bar.name}</h3>
            <form onsubmit="#" class="going" method="post" action="/going/${bar._id}">
              <button type="submit" class="button">${bar.amountGoing || 0} going</button>
            </form>
          </div>
        </div>
      </div>
    `;
  });

  // Split columns into rows of 2
  while (html.length > 0)
    output.push(html.splice(0, 3));

  return output
    .map(row => {
      return `
      <div class="columns">
        ${row.join('')}
      </div>
    `;
    })
    .join('');
}

export default makeCards;
