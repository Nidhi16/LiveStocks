"use strict";

var app = angular.module('liveStocksApp', ['ngRoute', 'chart.js']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/stocks', {
            controller: 'StocksController',
            templateUrl: '/templates/stocks.html'
        })
        .otherwise({redirectTo: '/stocks'});
});
