"use strict";

app.factory('StocksFactory', function($rootScope) {
    // Stores the history of all the data
    var stocksData = {};
    var factory = {};
    factory.stocksCurrentPrices = {};

    // Subscribe to the websocket for stock prices
    const stocksSocket = new WebSocket('ws://stocks.mnet.website');
    /**
     * Handles every time new data comes
     * @param event
     */
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
            $rootScope.$broadcast('stocks-changed');
        });
    };

    /**
     * Returns stock's current data
     * @param stockId
     * @returns {'price': tickerPrice,
                'time': tickerTime,
                'change': change}
     */
    factory.stockCurrentPrice = function(stockId) {
        return factory.stocksCurrentPrices[stockId];
    };

    /**
     * Returns last (length) changes of stock
     * @param stockId
     * @param length
     * @returns {Array} list of stock changes
     */
    var stocksRecentData = function(stockId, length) {
        var thisStockHistory = stocksData[stockId];
        if (!thisStockHistory) {
            return [];
        }
        if (thisStockHistory.length > length) {
            thisStockHistory.splice(0, thisStockHistory.length - length);
        }
        return thisStockHistory;
    };

    /**
     * Returns list of recent changes(type) of stock
     * @param stockId
     * @param type
     * @returns {Array} of (type) changes
     */
    factory.recentStockHistory = function(stockId, type) {
        var recentStocks = stocksRecentData(stockId, 20);
        var data = [];
        recentStocks.forEach(function(stockData) {
            var item = stockData[type];
            item = type === 'time' ? moment(item).format('H:mm:ss') : item;
            data.push(item);
        });
        return data;
    };

    return factory;
});
