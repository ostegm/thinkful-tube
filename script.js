const ZEEKEY = 'AIzaSyAkkPLJ01lsIR_BUSaqt05A6QseNQHI05M';
const ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

function getData(query_phrase, callback) {
  const query = {
    part: 'snippet',
    q: query_phrase,
    key: ZEEKEY,
  }
  console.log(`Preparing to send query: ${query}`);
  $.getJSON(ENDPOINT, query, callback)
}


function makeImageHtml(item) {
  const url = item.snippet.thumbnails.default.url;
  const title = item.snippet.title;
  return `
   <div class="search-result">
      <h2>${title}</h2>
      <img src="${url}" alt="${title}">
   </div>
  `}

function displayResults(data) {
  const resultHTML = data.items.map(makeImageHtml);
  $('.js-results').html(resultHTML);
}


function watchSubmit() {
	$('.js-submit').click(event => {
    event.preventDefault();
    const q = $('#search-term').val()
    $('#search-term').val("")

    getData(q, displayResults)

	})
}

$(watchSubmit)
