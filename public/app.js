$(document).ready(function () {
    $.getJSON('/', function (data) {
        console.log(data)
    });

});

// scrape the website again and push the data to database on click
$(document).on('click', '#scrape', () => {
    $.ajax({
        method: 'GET',
        url: `/api/scrape`
    }).then(function (data) {
        console.log(data);
        document.location.href = '/';

    })
});