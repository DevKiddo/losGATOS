// onSucces & onError are passed to jQuery promise

let onSuccess = function (data, status) {
    $("#result").html(data);
};

let onError = function (data, status) {
    console.log("status", status);
    console.log("error", data);
};

// Add Cat Button
$("#addcat").on("click", function (event) {
    event.stopImmediatePropagation(); // avoid sending multiple requests
    $.get("cats/new")
        .done(onSuccess)
        .error(onError);
});

// Show All Button
$("#showall").on("click", function (event) {
    event.stopImmediatePropagation();
    $.get("cats")
        .done(onSuccess)
        .error(onError);
});

// Delete Oldest Button
$("#deleteold").on("click", function (event) {
    event.stopImmediatePropagation();
    $.ajax({
        url: 'cats/delete/old',
        type: 'DELETE'
    })
        .done(onSuccess)
        .error(onError);
});

// By Color Button
$("#bycolor").on("click", function (event) {
    event.stopImmediatePropagation();
    let color = prompt("Please enter a color:")
    if (color != null) {
        $.get("cats/bycolor/" + color)
            .done(onSuccess)
            .error(onError);
    }
});

// By Price Button
$("#byprice").on("click", function (event) {
    event.stopImmediatePropagation();
    let priceRange = prompt("Please enter price range separated by a comma:")
    if (priceRange != null) {
        $.get("cats/price/" + priceRange)
            .done(onSuccess)
            .error(onError);
    }
});