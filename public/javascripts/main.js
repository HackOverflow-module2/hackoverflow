$( document ).ready(function() {
    Order(".order-rating",".questions-wrap");

});

function Order(ratingButton, postsList) {
    $( ratingButton ).click(function() {
        let cont = $(postsList);
    
        let arr = $.makeArray(cont.children(".post-card"));
    
        arr.sort(function(a, b) {
            var valA = +$(a).find('.rating-num').val();
            var valB = +$(b).find('.rating-num').val();
    
            if (valA < valB) return 1;
            if (valA > valB) return -1;
    
            return 0;
        });
    
        cont.empty();
    
        $.each(arr, function() {
            cont.append(this);
        });
    
    });
}