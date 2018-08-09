$( document ).ready(function() {
    
    // functions to order by date and rating     
    order(".order-rating",".questions-wrap", arraySortRatingNum);
    order(".order-date",".questions-wrap", arraySortDate); 

    order(".order-rating-resource",".resources-wrap", arraySortRatingNum);
    order(".order-date-resource",".resources-wrap", arraySortDate); 

    // ellipses

    $(".ellipses").dotdotdot({
        // Options go here
     });
});

function order(ratingButton, postsList, sortFunction) {
    $( ratingButton ).click(function() {
        let cont = $(postsList);
    
        let arr = $.makeArray(cont.children(".post-card"));
    
        sortFunction(arr);

        cont.empty();
    
        $.each(arr, function() {
            cont.append(this);
        });
    
    });
}

//TODO find better way to not repeat this code:
function arraySortRatingNum(arr) {

    return arr.sort(function(a, b) {
        var valA = +$(a).find(".rating-num").val();
        var valB = +$(b).find(".rating-num").val();
    
        return (valA < valB) ? 1 : ((valA > valB) ? -1 : 0);
    
    });
}

function arraySortDate(arr) {

    return arr.sort(function(a, b) {
        var valA = +$(a).find(".date").text();
        var valB = +$(b).find(".date").text();
    
        return (valA < valB) ? 1 : ((valA > valB) ? -1 : 0);
    
    });
}

function likes(form, likeVal) {
    $(document).on("submit", form, function(event) {    
        event.preventDefault();
        
        $.post(this.action, function(data) {
            $(this).find(likeVal).val(
                data.newRating
            )
        }.bind(this))
    })

}

likes("#like-form", "#like")
likes("#resources-like-form", "#resources-like")


//markdown editor
var editor = new Editor({
    element: document.getElementById("description")
});

editor.render();