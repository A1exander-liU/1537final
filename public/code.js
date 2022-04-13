received_data = null;

function displayThisUnicorn(thisUnicorn) {
    console.log("called displayTHisUncorn")

    unicornInfo = ""
    unicornInfo += "<ul>"

    for (field in thisUnicorn[0]) {
        unicornInfo += "<li>"

        if (field == "loves") {
            unicornInfo += "<ul>"

            for (j = 0; j < thisUnicorn[0]["loves"].length; j++) {
                unicornInfo += "<li>"
                unicornInfo += thisUnicorn[0][field][j]
                unicornInfo += "</li>"
            }

            unicornInfo += "</ul>"
        }else{
            unicornInfo += thisUnicorn[0][field]
        }

        unicornInfo += "</li>"
    }

    unicornInfo += "</ul>"

    $('#right').html(unicornInfo)
}

function getThisUnicorn() {
    console.log($(this).attr('id'))
    thisUnicorn = $(this).attr('id')
    $.ajax(
        {
            url: "http://localhost:5000/displayThisUnicorn",
            type: "POST",
            data: {
                "name": thisUnicorn
            },
            success: displayThisUnicorn
        }
    )

}

function process_reponse(data) {
    received_data = data
    result = ""
    result += "<ol>"

    for (i = 0; i < data.length; i++) {
        result += "<li>"
        result += "<button class='displayUnicorn' id='" + data[i].name + "'>"
        result += data[i].name
        result += "</button>"
        result += "</li>"
    }

    result += "</ol>"

    $('#results').html(result)
}


function getAllUnicorns() {
    $.ajax(
        {
            url: "http://localhost:5000/findAllUnicorns",
            type: "POST",
            success: process_reponse
        }
    )
}


function setup() {
    $('#allUnicorns').click(getAllUnicorns)
    $('body').on('click', '.displayUnicorn', getThisUnicorn)
}

$(document).ready(setup)