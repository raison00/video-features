//Simple logger module   
//Let's come back to this and re-evaluate logger libraries  
//log4js AMD, etc.  
//ignoring browsers w/o a console for now  
define( function () {
    'use strict';
    // logging is off in production by default
    var loggingEnabled = true,
        loc = window.location,
        host = loc.host;

    // enabled by default in qa and local environments
    if ( host.indexOf( ".com" ) !== -1 && host.indexOf( ".fds.com" ) === -1 ) {
        // likely production so 
        if ( loc.search.search( "[?&]debug=[^&]+" ) === -1 ) {
            // not debug mode either
            loggingEnabled = false;
        }
    }

    try {
        ////////////////////////////////////////////////////////
        // although we are using local storage we don't want to 
        // use the storage module as we may need logging 
        // in that module
        // do not change how this is done
        ////////////////////////////////////////////////////////
        // disable logging because you don't want to look at it
        if ( loggingEnabled && localStorage.getItem( 'disableLogger' ) ) {
            loggingEnabled = false;
        } else if ( localStorage.getItem( 'enableLogger' ) ) {
            // if running the page in debug mode or if some value for debug is set in localStorage,
            // then turn logging on
            loggingEnabled = true;
        }
    } catch ( e ) {}

    function callConsoleMethod( method, args ) {

        if ( loggingEnabled ) {

            if ( typeof console === "object" && typeof console[ method ] === "function" ) {
                console[ method ].apply( console, args );
            }
        }
        return true;
    }

    function error() {
        return callConsoleMethod( "error", arguments );
    }

    function warn() {
        return callConsoleMethod( "warn", arguments );
    }

    function info() {
        return callConsoleMethod( "info", arguments );
    }

    function log() {
        return callConsoleMethod( "log", arguments );
    }

    function dir() {
        return callConsoleMethod( "dir", arguments );
    }

    function time() {
        return callConsoleMethod( "time", arguments );
    }

    function timeEnd() {
        return callConsoleMethod( "timeEnd", arguments );
    }

    return {
        error: error,
        warn: warn,
        info: info,
        dir: dir,
        log: log,
        time: time,
        timeEnd: timeEnd
    };
} );
