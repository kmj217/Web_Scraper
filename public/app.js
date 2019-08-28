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

// click event to unsave an article
$(document).on('click', '.saved', function() {
    $(this).removeClass("saved");
    var data = $(this).data("id");
    console.log($(this).data("id"));
    $.ajax({
        method: 'PUT',
        url: '/api/saved',
        data: {id: data,
                saved: false}
    }).then(function () {
        document.location.href = '/';

    })
});