$(document).ready(function () {
    let endpoint = 'https://auth.predicthq.com/token';
    let token = 'NFlkQVQ2ZGE0QUE6OEF6VzZicWdTWUFMVHNJUWVoNnN4MGN3dnJHRk5nb3pEWE1hZlNELU55MF9hV19yMmduRGN3';
    let accessToken = null
    $.ajax({
        url: endpoint,
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + token,
            'Content-Type': 'application/x-www-form-urlcoded'
            
        },
        data: 'grant_type=client_credentials&scope=events'
    }).then(function (response) {
        console.log(response); 
        accessToken = response.access_token;
        $.ajax({
            url: 'https://api.predicthq.com/v1/events',
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
        })
        .then(function (response) {
            console.log(response);
        })
    })
});
