# store.js
*Provides an alternative implementation of localStorage.*

### Why
The problem with localStorage is that it stringifies every value you save and you can only save key-value pairs, you have no nesting, no structure.  
Also, you cannot just make a "second", clean storage.

### Howto
Let's say you just want to start over, and make a new store:

    var myStore = Store("myStore");

You just choose a name for a new store, and save it in a variable. Now you have an object that you can manipulate as usual:

    myStore.extension = {
        "version": "0.2",
        "install_script_done": false
    };
    myStore.settings = {
        "self_destruct": true,
        "kill_users": false
    };
    myStore.isCool = true;

Now you're ready, you have everything in it you want to save. So let's save:

    myStore.save();

And that's it! Now if you want to access the stored values, you just restore the object using the same name:

    var myStore = Store("myStore");

Now you can access everything in myStore. :)  
And if you want a second, clean store you can have that as well:

    var myOtherStore = Store("myOtherStore");

To remove a store, run this:

    myStore.remove();

### License
store.js is licensed under the **MIT-license**.  
For details see *LICENSE.txt*
