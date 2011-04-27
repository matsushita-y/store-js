# [store.js](https://github.com/frankkohlhepp/store-js)
*A powerful toolkit for localStorage.*

### Why
The main problem with localStorage is that it stringifies every value you save.  
Starting with that issue, localStorage is not very powerful: You just can save key-value pairs. And that's it.  
You don't have any structure (or groups), you cannot make a second, clean group, you cannot conveniently set default values, and you cannot just put a group of values into an object.

But with store.js - you can do all of that.

### Howto
store.js groups your values into something called stores. So let's make a new store:

``` javascript
var settings = new Store("settings");
```

You just choose a name for the new store, and save it in a variable. Now you can almost normally get and set values:

``` javascript
settings.set("color", "blue");
settings.set("enable_test1", true);
settings.set("number_of_rainbows": 8);

// and

var color = settings.get("color");
// ...
```

Pretty normal. But it automatically JSON-serializes and JSON-deserializes your values. So, if you put a boolean in, a boolean comes out.  
store.js saves the values with the group name, so the value "color" becomes "store.settings.color".

Now you can interact with that store, e.g. put all values into a convenient-to-use object:

``` javascript
var settingsObj = settings.toObject();
```





    myStore.extension = {
        "version": "0.2",
        "install_script_done": false
    };
    myStore.settings = {
        "self_destruct": true,
        "kill_users": false
    };
    myStore.isCool = true;

myStore now contains everything you want to save, so let's go for it:

    myStore.save();

And that's it! Now let's say you want to access the stored values later on.  
Do to that, you just restore the object using the same name:

    var myStore = Store("myStore");

Now you can access everything in myStore.  
And if you want a second, clean store you can have that as well:

    var myOtherStore = Store("myOtherStore");

To restore a store to an empty object, run this:

    myStore.clean();

And to remove a store from localStorage (and empty the object, so you can reuse it), run this:

    myStore.remove();

### Quota
Just one more thing: localStorage has a quota. When it is exceeded, store.js will throw an exception called "quotaExceeded".  
But the quota is usually so huge, you don't have to worry about that at all.

### Multible Instances
You can safely use store.js across multible instances. When you safe, the store is being merged.  
As I said - the **store** is being merged, not single variables. This includes arrays, so be careful!

### License
store.js is licensed under the **MIT-license**.  
For details see *LICENSE.txt*
