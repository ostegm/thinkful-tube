const ZEEKEY = 'AIzaSyAHrofdI7wqp3cqiMNxRmpK50iDrtoCfgo';
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
  let resultItem = $('.js-result-template').children().clone();
  const imgUrl = item.snippet.thumbnails.medium.url;
  const title = item.snippet.title;
  const videoUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`
  resultItem.find('a').attr('href', videoUrl);
  resultItem.find('img').attr('src', imgUrl);
  resultItem.find('alt').attr('src', title);
  return resultItem
}

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

window.document.onkeydown = function(e) {
  if (!e) {
    e = event;
  }
  if (e.keyCode == 27) {
    lightbox_close();
  }
}

function lightbox_open() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  window.scrollTo(0, 0);
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  lightBoxVideo.play();
}

function lightbox_close() {
  var lightBoxVideo = document.getElementById("VisaChipCardVideo");
  document.getElementById('light').style.display = 'none';
  document.getElementById('fade').style.display = 'none';
  lightBoxVideo.pause();
}


$(watchSubmit)
