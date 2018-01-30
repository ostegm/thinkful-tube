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

function displayResults(data) {
  console.log(data);
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
