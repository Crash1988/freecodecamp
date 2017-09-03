function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');

    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    } else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        // clear and hide result container when we press close
        container.find('.result-container').fadeOut(100, function() { $(this).empty(); });
    }
    $('#elementsid').html("");

}

function submitFn(obj, evt) {
    // $('#divsearchid').css("margin-top", "80px");
    value = $(obj).find('.search-input').val().trim();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    var jsoncall = api + value + cb;
    $.get(jsoncall, function(res) {
        $('#elementsid').html("");
        var results = res.query.pages;
        console.log(typeof(results));
        for (i in results) {
            let elem1 = "<div class=\"col-md-12 element\"> <a href="
            let hrefw = "\"https://en.wikipedia.org/?curid=" + results[i]["pageid"] + "\"";
            let elemt2 = "style=\"display: block;\">";
            let title = "<h2>" + results[i]['title'] + "</h2>";
            let end = "<h4>" + results[i]['extract'] + "</h4></a> </div>";
            let descrip = "";
            $('#elementsid').append(elem1 + hrefw + elemt2 + title + end);
            console.log(results[i]);
        }

    }, "jsonp");



    evt.preventDefault();
}

function searchAutoComplete(obj, event) {
    var value1 = obj.value;
    var autocompleteVal = [];
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    var jsoncall = api + value1 + cb;
    $.get(jsoncall, function(res) {
        var results = res.query.pages;
        for (i in results) {
            autocompleteVal.push(results[i]['title']);
        }

        $("#search-inputId").autocomplete({
            source: autocompleteVal
        });





    }, "jsonp");


}