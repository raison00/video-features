define( [ 'jquery' ], function ( $ ) {

    var formUtil = {

        escapeId: function ( id ) {
            return id && id.replace && id.replace( /(:|\.|\[|\])/g, "\\$1" );
        },

        getNodeByName: function ( validateField, rules ) {
            if ( typeof validateField !== "string" ) {
                return "";
            }
            var arr = validateField.split( /[.,]/ );
            var newObj = rules;
            var node = this.getNode( arr, newObj );
            return node;
        },

        // returns false if any key in pathArr is NOT found
        getNode: function ( pathArr, configHash ) {
            var tmp = {};

            for ( var i = 0; i < pathArr.length; i++ ) {
                var key = pathArr[ i ].trim();
                if ( configHash[ key ] ) {
                    tmp[ key ] = configHash[ key ];
                } else {
                    return false;
                }
            }
            return tmp;
        }
    };

    return formUtil;

} );
