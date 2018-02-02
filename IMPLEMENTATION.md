# IMPLEMENTATION

Being a single page application, this application uses angular.js for the whole front-end logic and angular.route.js
for routing mechanism(to go from one page to other pages without sending request to server)

### Structure
The frontend is divided mainly in four files:
#### app.js
This file is responsible for creating the angular main module and injecting the dependencies.

This file is responsible for configuring the route paths, i.e on the given request, the corresponding templates and controllers should get called.

There is only two routes, one is for displaying the ticker name, prices, and time and other displays the ticker chart according to the increasing and decreasing prices.

### controllers.js
This file is responsible for creating two controllers for two route paths.

This file calls the stocks factory and the stocks factory return objects to the controller.

The returned object have some properties attached with it, those data are passed to the view to display on the page

This file is also responsible for updating the ui through calling digest lifecycle
