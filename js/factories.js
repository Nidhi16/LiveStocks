app.factory('StocksFactory', function($rootScope, $timeout) {
    // Stores the history of all the data
    var stocksData = {};
    var factory = {};
    factory.stocksCurrentPrices = {};

    // Subscribe to the websocket for stock prices
    const stocksSocket = new WebSocket('ws://stocks.mnet.website');
    stocksSocket.onmessage = function(event) {
        var tickerTime = new Date();  // // Time of the data update
        var data = JSON.parse(event.data);

        data.forEach(function (value) {
            var tickerId = value[0];  // Ticker ID
            var tickerPrice = value[1]; // Ticker Price

            var change = -1;
            if (!(tickerId in stocksData)) {
                stocksData[tickerId] = [];
                factory.stocksCurrentPrices[tickerId] = {};
                change = 0;
            }
            if (change !== 0) {
                // Comparing to previous price
                var tickerPrices = stocksData[tickerId];
                var previousPrice = tickerPrices[tickerPrices.length - 1]['price'];
                change = previousPrice > tickerPrice ? 2 : 1;
            }
            var thisStockData = {
                'price': tickerPrice,
                'time': tickerTime,
                'change': change
            };
            // Adding for history
            stocksData[tickerId].push(thisStockData);

            // Adding to current prices
            factory.stocksCurrentPrices[tickerId] = thisStockData;

            // Notify of changes
            $timeout(function() {
                $rootScope.$broadcast();
            });
        });
    };

    factory.stockCurrentPrice = function(stockId) {
        return factory.stocksCurrentPrices[stockId];
    };

    factory.stockHistory = function(stockId) {
        return stocksData[stockId];
    };

    return factory;
});
