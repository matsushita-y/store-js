# [store.js](https://github.com/frankkohlhepp/store-js)
*A powerful toolkit for localStorage.*

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
settings.set("number_of_rainbows": 8);

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
#### Constructor
``` javascript
var settings = new Store("settings");
```
**Parameters:** name(string)  
**Return value:** store(object)

Create a new Store.

#### Constructor with default values
``` javascript
var settings = new Store("settings", {
    "color": "red",
    "number_of_rainbows": 3
});
```

**Parameters:** name(string), defaults(object)
**Return value:** store(object)

### License
store.js is licensed under the **MIT-license**.  
For details see *LICENSE.txt*























