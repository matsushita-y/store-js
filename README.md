# [store.js](https://github.com/frankkohlhepp/store-js)
*A small, yet powerful toolkit for localStorage.*

### Why
The main problem with localStorage is that it stringifies every value you save.  
Starting with that issue, localStorage is not very powerful: You just can save key-value pairs. And that's it.  
You don't have any structure (or groups), you cannot make a second, clean group, you cannot conveniently set default values, and you cannot just put a group of values into an object.

But with store.js - you can do all of that.

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

Pretty normal. But it automatically JSON-serializes and JSON-deserializes your values. So, if you put a boolean in, a boolean comes out.  
store.js saves the values with the group name, so the value "color" becomes "store.settings.color" in localStorage.

Now you can interact with that store, e.g. put all values into a convenient-to-use object:

``` javascript
var settingsObj = settings.toObject();
```

The rest of store.js is described in the following method reference:

### Reference
\* = optional

## Constructor
``` javascript
var settings = new Store("settings", {
    "color": "blue",
    "sound": 0.8
});
```
**Parameters:** name(string), *defaults(object)  
**Return value:** store(object)

Creates a new Store with default values. (optional)  
If a value is already present in localStorage, it will not be overridden.  
If a value is NOT already present, it will be created with the default value.

## get()
``` javascript
var settings = new Store("settings");
var color = settings.get("color");
```

**Parameters:** name(string)  
**Return value:** value(any) or undefined

Retrieves a value. (And automatically JSON-serializes it)  
If a value is not present in localStorage, it will return undefined.

## set()
``` javascript
var settings = new Store("settings");
settings.set("color", "blue");
```

**Parameters:** name(string), value(any)  
**Return value:** store(object)

Sets a value. (And automatically JSON-deserializes it)  
If the new value is undefined, the value will be removed from localStorage.  
Use null instead, if you want to set a value to "nothing".

## remove()
``` javascript
var settings = new Store("settings");
settings.remove("color");
```

**Parameters:** name(string)  
**Return value:** store(object)

Removes a value.

## removeAll()
``` javascript
var settings = new Store("settings");
settings.removeAll();
```

**Parameters:** (none)  
**Return value:** store(object)

Removes all values of a store.

## toObject()
``` javascript
var settings = new Store("settings");
var settingsObj = settings.toObject();
```

**Parameters:** (none)  
**Return value:** values(object)

Puts all values of a store in a object.

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

**Parameters:** values(object), *merge(boolean)  
**Return value:** store(object)

Replaces the store with the values from the object.  
If "merge" is not true (which is the default), then the complete store will be removed, and replaced with the values.  
If "merge" is true, then new values will be added, different values will be replaced, all other values will not be touched.

### License
store.js is licensed under the **MIT-license**.  
For details see *LICENSE.txt*
