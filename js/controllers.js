app.controller('StocksController', function($scope, StocksFactory) {

    $scope.stocks = StocksFactory.stocksCurrentPrices;

});
