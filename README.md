# Angularjs 1.x directive reflection

If you want to list the scope variables that a directive accepts at runtime, ie. in browser then this piece of code might by handy.

Right now the code works like this, given a module name it will find all directives in it and return a hash of `{<directiveName>: <scope object}`.

This code might be used in building screen builders where you may need to list down all the directives and the properties they take as input. In the screen builder you, first select a directive from a list, and can map variables available in Controller$scope to the directive listed isolated scope variables.

### Welcome to contribute

### MIT Licensed
Feel free to fork and use. 
