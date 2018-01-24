app.controller('StocksController', function($scope, StocksFactory) {

    $scope.stocks = StocksFactory.stocksCurrentPrices;

    // HACK This is used to force the digest every second as the changes in $scope.stocks
    // was not reflected in the UI
    setInterval(function() {
        $scope.$digest();
    }, 1000);
});
