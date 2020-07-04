$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    const newBurger = {
      burger_name: $("#newburger").val().trim(),
      devoured: 0,
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new burger");
      location.reload();
    });
  });

  $("body").on("click", ".eatburger", function (event) {
    event.preventDefault();
    console.log("click here");
    const id = $(this).data("id");
    const devouredState = {
      devoured: true,
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState,
    }).then(function () {
      console.log("Burger devoured");
      location.reload();
    });
  });

  $(".deleteburger").on("click", function (event) {
    event.preventDefault();

    const id = $(this).data("id");

    $.ajax({
      type: "DELETE",
      url: "/api/burgers/" + id,
    }).then(location.reload());
  });
});
