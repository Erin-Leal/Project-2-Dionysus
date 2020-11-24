$(document).ready(() => {
  $("#button-addon2").on("click", () => {
    const endpoint = "https://auth.predicthq.com/token";
    const search = $(".form-control").val().trim();
    const token =
      "M1FCSGdRYWxvZ0U6VW1hRUxrUnYzZ0Q3TFdiV3pEYzZQb2JDdUVuWXJBX2JNdms1aklCb0dsLWRMa0tUaThwS3d3";
    let accessToken = null;
    $.ajax({
      url: endpoint,
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
        "Content-Type": "application/x-www-form-urlcoded",
      },
      data: "grant_type=client_credentials&scope=places",
    }).then((placeauthresponse) => {
      // console.log(placeauthresponse);
      accessToken = placeauthresponse.access_token;
      $.ajax({
        url: "https://api.predicthq.com/v1/places/?q=" + search,
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then((placesresponse) => {
        $.ajax({
          url: endpoint,
          method: "POST",
          headers: {
            Authorization: "Basic " + token,
            "Content-Type": "application/x-www-form-urlcoded",
          },
          data: "grant_type=client_credentials&scope=events",
        }).then((eventsauthresponse) => {
          accessToken = eventsauthresponse.access_token;
          // console.log(eventsauthresponse);
          $.ajax({
            url: "https://api.predicthq.com/v1/events/?q=" + search,
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }).then((eventsresponse) => {
            console.log(eventsresponse, placesresponse);
            $("#description").empty();
            for (let i = 0; i < 10; i++) {
              const titleValue = $("<h4>")
                .text(eventsresponse.results[i].title)
                .addClass("title is-5");
              const dateResponse = eventsresponse.results[i].start;
              const startTimeDate = new Date(dateResponse);
              const dateFinal = $("<p>").text("Date: " + startTimeDate);
              const address = $("<p>").text(
                "Address: " +
                  eventsresponse.results[1].entities[0].formatted_address
              );
              const eventDesc = $("<p>").text(
                "Description: " + eventsresponse.results[i].description
              );

              $("#description").append(titleValue, dateFinal, address);
              if (eventsresponse.results[i].description === "") {
                //console.log(eventsresponse);
              } else {
                $("#description").append(eventDesc);
              }
            }
          });
        });
      });
    });
  });
});

// $(document).ready(() => {
//   const endpoint = "https://auth.predicthq.com/token";
//   const token =
//     "NFlkQVQ2ZGE0QUE6OEF6VzZicWdTWUFMVHNJUWVoNnN4MGN3dnJHRk5nb3pEWE1hZlNELU55MF9hV19yMmduRGN3";
//   let accessToken = null;
//   $.ajax({
//     url: endpoint,
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + token,
//       "Content-Type": "application/x-www-form-urlcoded",
//     },
//     data: "grant_type=client_credentials&scope=events",
//   }).then((response) => {
//     console.log(response);
//     accessToken = response.access_token;
//     $.ajax({
//       url: "https://api.predicthq.com/v1/events/?place.scope=5128638",
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + accessToken,
//       },
//     }).then((response) => {
//       console.log(response);
//     });
//   });
// });
