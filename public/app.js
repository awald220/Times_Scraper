// scrape function
("#scrape").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/scraped",
    }).then(function(data){
        console.log(data)
        window.location = "/"
    })
});

//save function
$(".save").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/saved/" + thisId
    }).then(function(data) {
        window.location = "/"
    })
});

//delete function
$(".delete").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/delete/" + thisId
    }).then(function(data) {
        window.location = "/"
    })
});

//note function
$(".save-note").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          body: $("#noteText" + thisId).val()
        //   body: $("#noteText").val()
        }
      }).then(function(data) {
          // Log the response
          console.log(data);
          // Empty the notes section
          $("#noteText" + thisId).val("");
          $(".modalNote").modal("hide");
          window.location = "/saved"
    });

});

//delete note 
$(".deleteNote").on("click", function() {
    var thisId = $(this).attr("data-note-id");
    $.ajax({
        method: "POST",
        url: "/deleteNote/" + thisId,
      }).then(function(data) {
          // Log the response
          console.log(data);
          window.location = "/saved"
        })
})