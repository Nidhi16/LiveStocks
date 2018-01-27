"use strict";

var app = angular.module('liveStocksApp', ['ngRoute', 'chart.js']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/stocks', {
            controller: 'StocksController',
            templateUrl: '/templates/stocks.html'
        })
        .when('/stock/:stockId', {
            controller:'SingleStockController',
            templateUrl:'/templates/single_stock.html'
        })
        .otherwise({redirectTo: '/stocks'});
});
