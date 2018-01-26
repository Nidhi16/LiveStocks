app.controller('StocksController', function($scope, StocksFactory) {

    $scope.stocks = StocksFactory.stocksCurrentPrices;

});

app.controller('SingleStockController', function($scope, $routeParams, StocksFactory) {
    $scope.stockId = $routeParams.stockId;
    $scope.stockData = StocksFactory.stockCurrentPrice;
    $scope.stockHistory = StocksFactory.stockHistory;
});
