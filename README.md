# Angularjs 1.x directive reflection

If you want to list the scope variables that a directive accepts at runtime, ie. in browser then this piece of code might by handy.

Right now the code works like this, given a module name it will find all directives in it and return a hash of `{<directiveName>: <scope object}`.

This code might be used in building screen builders where you may need to list down all the directives and the properties they take as input. In the screen builder you, first select a directive from a list, and can map variables available in Controller$scope to the directive listed isolated scope variables.


## Mechanism

* Angularjs 1.x provide directives functions as string
* esprima javascript parser is used to parse the code, and produces AST
* AST tree traversal is done to find the scrope variable
* escodegen is used to covert scope object to javascript code
* eval is used to evaluate the code produced by escodegen to create scope object
* The scope object is converted into json and returned

## Code
```
var scopevars = DirectiveReflectionUtil.findScopeVars('myapp'); //returns a hash of all directives in myapp module and their scope object
JSON.stringify(scopevars, null, 3);  //view

```

### Output
```
{
   "card": [
      {
         "datatype": "reference",
         "name": "width"
      },
      {
         "datatype": "reference",
         "name": "height"
      },
      {
         "datatype": "string",
         "name": "title"
      },
      {
         "datatype": "string",
         "name": "message"
      },
      {
         "datatype": "string",
         "name": "bgcolor"
      }
   ]
}
```
### To run
To run the sample code just run a small http server in the base directory, and open `index.html` in browser

```
cd angular1directivereflection
angular1directivereflection> http-server
```

## Possible improvements
* Get rid of escodegen and parse scope object directly. This should not be impossible as scope:{} is fairly simple and predefined structure
* Doing this will enable to get comments as description of each field.

## Depends on 

* esprima
* escodegen-browser

## Welcome to contribute
Especially if you have removed escodegen and traversed AST to extract all the details.


## MIT Licensed
Feel free to fork and use. 
