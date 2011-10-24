# [store.js](https://github.com/frankkohlhepp/store-js) v3.0
*A powerful toolkit for localStorage.*

### Info
The main problem with localStorage is that it stringifies every value you save.  
Starting with that issue, localStorage is not very powerful: You just can save key-value pairs. And that's it.  
You don't have any structure (or groups), you cannot make a second, clean group, you cannot conveniently set default values,
and you cannot just put a group of values into an object. There are no events.

store.js solves all of these problems!

### Howto
store.js groups your values into something called a store. So let's make a new store:

``` javascript
var settings = new Store("settings");
```

Just choose a name for the new store, and save it in a variable. Now you can almost normally get and set values:

``` javascript
settings.set("color", "blue");
settings.set("enable_test1", true);
settings.set("number_of_rainbows", 8);

// and

var color = settings.get("color");
// ...
```

Pretty straight forward. But it automatically JSON-serializes and JSON-deserializes your values. So, if you put a boolean in, a boolean comes out.  
store.js saves the values with the store name, so the key "color" becomes "store.settings.color" in localStorage.

Now you can interact with that store, e.g. put all values into a convenient-to-use object:

``` javascript
var settingsObj = settings.toObject();
```

### Events
store.js supports events. Fake events to be exact. There is no way to add an event listener
for localstorage to the DOM, so store.js will emulate events by checking periodically for new values.
The default period is 300ms. You can set a custom value by setting watcherSpeed in the constructor.  
Keep in mind that checking for new values costs CPU time, so use this setting wisely.

To add and remove listeners, use addEvent() and removeEvent().

``` javascript
settings.addEvent("color", function (value) {
    console.log("New value of color is: " + value);
});
```

You can also subscribe to all values:

``` javascript
settings.addEvent("*", function (value, name) {
    console.log(name + " has a new value: " + value);
});
```

Remove a event listener (you need to save a reference to the callback function when adding the listener!):

``` javascript
var myFunction = function (value) {
    // do something
};

settings.addEvent("color", myFunction);
settings.removeEvent("color", myFunction);
```

The rest of store.js is described in the following method reference:

### Reference
\* = optional

## Constructor
``` javascript
var settings = new Store("settings", {
    "color": "blue",
    "sound": 0.8
}, 1000);

// OR...

var settings = new Store("settings", null, 500);

// OR...

var settings = new Store("settings");
```

**Parameters**: name(string), *defaults(object), *watcherSpeed(number)  
**Return value**: store(object)

Creates a new Store, optionally with default values and a custom watcher speed  
If a value is already present in localStorage, it will not be overridden.  
If a value is not already present, it will be created with the default value.

watcherSpeed sets the time in milliseconds for the event emulator.

## clear() (class method)
``` javascript
Store.clear();
```

**Parameters**: (none)  
**Return value**: (none)

Removes everything from localStorage.

## get()
``` javascript
var settings = new Store("settings");
var color = settings.get("color");
```

**Parameters**: name(string)  
**Return value**: value(any) or undefined

Retrieves a value. (And automatically JSON-deserializes it)  
If a value is not present in localStorage, it will return undefined.

## set()
``` javascript
var settings = new Store("settings");
settings.set("color", "blue");
```

**Parameters**: name(string), value(any)  
**Return value**: store(object)

Sets a value. (And automatically JSON-serializes it)  
If the new value is undefined, the value will be removed from localStorage.  
Use null instead, if you want to set a value to "nothing".

## remove()
``` javascript
var settings = new Store("settings");
settings.remove("color");
```

**Parameters**: name(string)  
**Return value**: store(object)

Removes a value.

## removeAll()
``` javascript
var settings = new Store("settings");
settings.removeAll();
```

**Parameters**: (none)  
**Return value**: store(object)

Removes all values of a store.

## toObject()
``` javascript
var settings = new Store("settings");
var settingsObj = settings.toObject();
```

**Parameters**: (none)  
**Return value**: values(object)

Puts all values of a store in an object.

## fromObject()
``` javascript
var settingsObj = {
    "color": "brown",
    "use_everything": true,
    "be_a_hero": true
};

var settings = new Store("settings");
settings.fromObject(settingsObj, true);
```

**Parameters**: values(object), *merge(boolean)  
**Return value**: store(object)

Replaces the store with the values from the object.  
If "merge" is false (which is the default), then the complete store will be removed, and replaced with the values.  
If "merge" is true, then new values will be added, different values will be replaced, all other values won't be touched.

## addEvent()
``` javascript
settings.addEvent("color", function (value, name, store) {
    // ...
});

// OR...

settings.addEvent("*", function (value, name, store) {
    // ...
});
```

**Parameters**: selector(string), callback(function)  
**Return value**: store(object)

Adds an event listener for a specific value or all values ("*").

## removeEvent()
``` javascript
settings.removeEvent("color", callback);

// OR...

settings.removeEvent("*", callback);
```

**Parameters**: selector(string), callback(function)  
**Return value**: store(object)

Removes an event listener for a specific value or all values ("*").  
The callback must be a pointer to a previously with addEvent() added function.

### License
store.js is licensed under the **MIT-license**.  
For details see *LICENSE.txt*
