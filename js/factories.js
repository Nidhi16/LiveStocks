app.factory('stocksFactory', function() {
    var factory ={};

    var stocks = {
        'goog': {
            'price': 100,
            'time': new Date().toISOString()
        },
        'msft': {
            'price': 200,
            'time': new Date().toISOString()
        },
        'intl': {
            'price': 300,
            'time': new Date().toISOString()
        }
    };

    factory.getStocks = function() {
        return stocks;
    };

    return factory;
});
