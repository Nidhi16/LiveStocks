app.filter('fromNow', function() {
    return function(time) {
        return moment(time).fromNow();
    };
});