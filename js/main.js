"use strict";

const changeColorMap = {
    0: 'ffffff',  // White, First Time
    1: '00ff00',  // Green, Increased
    2: 'ff0000'   // Red, Decreased
};
var stocksData = {};

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
            $('#stocks-display tbody').append('<tr id="' + tickerId + '"><td>' + tickerId.toUpperCase() + '</td>' +
                '<td></td><td></td></tr>');
            change = 0;
        }
        if (change !== 0) {
            // Comparing to previous price
            var tickerPrices = stocksData[tickerId];
            var previousPrice = tickerPrices[tickerPrices.length - 1]['price'];
            change = previousPrice > tickerPrice ? 2 : 1;
        }
        stocksData[tickerId].push({
            'price': tickerPrice,
            'time': tickerTime
        });

        // Set the ticker price with color
        var tickerPriceSelector = '#' + tickerId + ' td:nth-child(2)';
        $(tickerPriceSelector).text(tickerPrice);
        $(tickerPriceSelector).css('background-color', '#' + changeColorMap[change]);

        // Set the ticker time with relative time
        var tickerTimeSelector = '#' + tickerId + ' td:nth-child(3)';
        $(tickerTimeSelector).text(moment(tickerTime).fromNow());
        $(tickerTimeSelector).data('date', tickerTime.toISOString());
    });
};

/**
 * Updates the displayed timestamps of all the ticker items
 */
var updateTimeStamps = function() {
    $('tbody tr').each(function(index, ticker) {
        var tickerDateTime = $(ticker).find('td:nth-child(3)');
        tickerDateTime.text(moment(tickerDateTime.data('date')).fromNow());
    });
};

// Update timestamps every 5000 milliseconds
setInterval(updateTimeStamps, 5000);