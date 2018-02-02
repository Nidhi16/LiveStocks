# LiveStocks
Single page application to display live stocks. 

## Technology Used

* Websocket is used to communicate between server and client. 

* Angular.js is used to make pages

* AngularRoute.js is used to handle routing at front-end without sending request to server

* Chart.js is used to display chart for the stock prices(Increasing or decreasing) 

* Other libraries used - moment.js, jquery

## Implementation

* The front-end code is divided into app.js, controller.js, factories.js and filter.js

* In app.js, the routing mechanism is mentioned

* In controllers.js,implementation of single route is mentioned

* In factories.js, the communication through web sockets and data handling is mentioned

* In filters.js, created custom filter to change the date format

Click [here](IMPLEMENTATION.md) for more details on the implementation

## How to start

* Clone this repo or download the source code.

* Install Python in your system

* Run python -m SimpleHTTPServer 8000 

* Enter localhost:8000 or 127.0.0.1:8000 or 0.0.0.0:8000 in the browser

## Hosted on the github pages

* Click on the link [http://livestocks.nidhi16.tk/](http://livestocks.nidhi16.tk/)