"use strict";


const stocksSocket = new WebSocket('ws://stocks.mnet.website');
const changeColorMap = {
    0: 'ffffff',
    1: '00ff00',
    2: 'ff0000'
};

var stocksData = {};
stocksSocket.onmessage = function(event) {

    var tickerTime = new Date();
    var data = JSON.parse(event.data);

    data.forEach(function (value) {
        var tickerId = value[0];
        var tickerPrice = value[1];

        var change = -1;
        if (!(tickerId in stocksData)) {
            stocksData[tickerId] = [];
            $('#stocks-display tr:last').after('<tr id="' + tickerId + '"><td>' + tickerId.toUpperCase() + '</td><td></td><td></td></tr>');
            change = 0;
        }
        if (change !== 0) {
            var tickerPrices = stocksData[tickerId];
            var previousPrice = tickerPrices[tickerPrices.length - 1]['price'];
            change = previousPrice > tickerPrice ? 2 : 1;
        }
        stocksData[tickerId].push({
            'price': tickerPrice,
            'time': tickerTime
        });
        var tickerPriceSelector = '#' + tickerId + ' td:nth-child(2)';
        $(tickerPriceSelector).text(tickerPrice);
        var changeColorHex = changeColorMap[change];
        $(tickerPriceSelector).css('background-color', '#' + changeColorHex);
    });
};