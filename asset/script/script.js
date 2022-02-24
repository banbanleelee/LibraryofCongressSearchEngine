$('#search-result').hide();
$('#back').hide();

$('#search').on("click", function(event) {
    event.preventDefault();
    $('#main-container').addClass("align-items-stretch");
    $('#main-container').removeClass("align-items-center");
    $('#search-bar').removeClass("col-12 min-vh-100");
    $('#search-bar').addClass("col-4 h-100");
    $('#search-result').show();
    printSearchInput();
    getApi();
    $('#back').show();
});

$('#back').on("click", function() {
    $('#search-bar').addClass("col-12 min-vh-100");
    $('#search-bar').removeClass("col-4 h-100");
    $('#search-result').hide();
    $('#back').hide();
});

function printSearchInput() {
    var searchInput = $('#search-input').val();
    $('#search-query').text(searchInput);
}

function getApi() {
    var requestUrl = 'https://www.loc.gov/'+$('#category').val()+'/?q='+$('#search-input').val().toLowerCase()+'&fo=json';
    console.log('requestUrl:' + requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i=0; i<data.results.length; i++) {
                var result = $('<div></div').addClass('card-body').css({
                    "background-color": "white",
                    "border": "1px solid black",
                    "border-radius": "5px"});
                var title = $('<h2></h2>').addClass('card-title').text(data.results[i].title);
                var date = $('<p></p>').addClass('card-text').text('Date: '+ data.results[i].date);
                var subject = $('<p></p>').addClass('card-text').text('Subjects: ' + data.results[i].subject);
                var readMore = $('<button><a>Read More</a></button>').addClass('btn btn-secondary').attr("href", data.results[i].url);
                result.append(title, date, subject, readMore);
                $('#result-container').append(result);
            }
        })
}

