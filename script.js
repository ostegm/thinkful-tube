const ZEEKEY = 'AIzaSyAHrofdI7wqp3cqiMNxRmpK50iDrtoCfgo';
const ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

function getData(queryPhrase, callback) {
  const query = {
    part: 'snippet',
    q: queryPhrase,
    key: ZEEKEY,
  };
  $.getJSON(ENDPOINT, query, callback);
}

function makeImageHtml(item) {
  let resultItem = $('.js-result-template')
    .children()
    .clone();
  const imgUrl = item.snippet.thumbnails.medium.url;
  const title = item.snippet.title;
  const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`;
  resultItem.find('a').attr('href', videoUrl);
  resultItem.find('img').attr('src', imgUrl);
  resultItem.find('img').attr('alt', title);
  return resultItem;
}

function displayResults(data) {
  const resultsDiv = $('.js-results');
  const resultHeader = `<p class="results-text">Showing ${data.items.length} results:</h2`;
  const resultHTML = data.items.map(makeImageHtml);
  resultsDiv
    .prop('hidden', false)
    .html(resultHeader)
    .append(resultHTML);

}

function watchSubmit() {
  const searchForm = $('form[name="youtube-search"]');
  const searchBox = $('input[name="query"]');

  searchForm.submit(e => {
    e.preventDefault();
    const q = searchBox.val();
    searchBox.val('');
    getData(q, displayResults);
  });
}

$(watchSubmit);
