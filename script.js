


function watchSubmit() {
	$('.js-submit').click(event => {
    event.preventDefault();
    const q = $('#search-term').val()
    $('#search-term').val("")
	})
}

$(watchSubmit)
