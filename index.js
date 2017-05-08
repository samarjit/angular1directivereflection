var module = angular.module("myapp",[]);

module.factory("DirectiveReflectionUtil",['$rootScope', function($rootScope){

	function traverse(node, func) {
        func(node);//1
        for (var key in node) { //2
            if (node.hasOwnProperty(key)) { //3
                var child = node[key];
                if (typeof child === 'object' && child !== null) { //4

                    if (Array.isArray(child)) {
                        child.forEach(function(node) { //5 //NOSONAR
                            traverse(node, func);
                        });
                    } else {
                        traverse(child, func); //6
                    }
                }
            }
        }
    }


	return {


		findScopeVars: function (mod){
			var fn = 'var fn = ';
            var fnDef = null;
            var chartDefs = {};

			angular.module(mod)['_invokeQueue'].filter( function (i) { return  i[1] === 'directive'; }).forEach(function(value){ 
                    var x = value[2][1]; 
                    fnDef = x[x.length-1]; 
                    var directiveName = value[2][0];
                    fnDef = fn + fnDef; 
                    var ast = esprima.parse(fnDef);
                    traverse(ast, function(node) {
                        if(node.key && node.key.name === 'scope') {
                            var scp = 'y = {'+(escodegen.generate(node)) +'}';
                            var scopeObj = $rootScope.$eval(scp);
                            var properties = Object.keys(scopeObj.scope).map(function (v){
                                var obj = {};
                                if(scopeObj.scope[v] === '@') {
                                    obj.datatype = 'string';
                                } else {
                                    obj.datatype = 'reference';
                                }
                                obj.name = v;
                                return obj;
                            });
                            chartDefs[directiveName] = properties;// Object.keys(scopeObj.scope);
                        }
                    });
            });
            return chartDefs; 
		}
	}
}]);


module.controller("MyController", ['$scope', 'DirectiveReflectionUtil', function($scope, DirectiveReflectionUtil){
	$scope.listDirectiveScope = function() {

		var scopevars = DirectiveReflectionUtil.findScopeVars('myapp');
		$("#logscopevars").text(JSON.stringify(scopevars, null, 3));
	}
}]);