"use strict";

app.controller('StocksController', function($scope, $timeout, StocksFactory) {

    $scope.stocks = StocksFactory.stocksCurrentPrices;

    $scope.$on('stocks-changed', function() {
        $timeout(function() {
            $scope.$digest();
        });
    });

});

app.controller('SingleStockController', function($scope, $timeout, $routeParams, StocksFactory) {
    var stockData = function(stockId, type) {
        return StocksFactory.recentStockHistory(stockId, type);
    };
    // Reset the animation time to 0
    Chart.defaults.global.animation.duration = 0;

    $scope.stockId = $routeParams.stockId;
    $scope.stockData = StocksFactory.stockCurrentPrice;

    $scope.labels = stockData($scope.stockId, 'time');
    $scope.data = stockData($scope.stockId, 'price');
    $scope.series = [$scope.stockId];

    $scope.$on('stocks-changed', function() {
        $timeout(function() {
            $scope.labels = stockData($scope.stockId, 'time');
            $scope.data = stockData($scope.stockId, 'price');
            $scope.$digest();
        });
    });
});
