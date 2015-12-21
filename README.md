if you got this error
````html
zone is not defined for ng zone
`````

check this out http://stackoverflow.com/questions/34359303/zone-is-not-defined-for-ngzone-angular22-0-0-beta-0

angular2\ts\src\core\zone\ng_zone.ts@352 or angular2/src/core/zone/ng_zone.js
````js
Zone.longStackTraceZone, {onError: function(e) { ngZone._notifyOnError(this, e); ***REMOVED******REMOVED***);

To

zone.longStackTraceZone, {onError: function(e) { ngZone._notifyOnError(this, e); ***REMOVED******REMOVED***);
````

ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789