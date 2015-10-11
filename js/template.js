// require('$');

/**
* Use Like:
*
*   var name = 'Jack';
*   $.template('My name is {{name}}.', {name: name}); // My name is Jack.
*
*/

$.template = function(tpl, obj) {
    return tpl.replace(/{{([^}]*)}}/ig, function() {
        with(obj) {
            return eval('('+arguments[1]+')');
        }

    });
};