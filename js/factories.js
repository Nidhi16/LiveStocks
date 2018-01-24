app.factory('StocksFactory', function() {
    var stocksData = {};
    var factory ={};
    factory.stocksCurrentPrices = {};

    // Local copy of the stock current prices
    var stocksCurrentPrices = {};

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
                stocksCurrentPrices[tickerId] = {};
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
            stocksCurrentPrices[tickerId] = thisStockData;

            // Live update the values in the factory
            angular.copy(stocksCurrentPrices, factory.stocksCurrentPrices);
        });
    };

    return factory;
});