app.controller('StocksController', function($scope, stocksFactory) {

    $scope.stocks = stocksFactory.getStocks();

});
