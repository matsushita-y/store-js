//
// store.js by Frank Kohlhepp
// Copyright (c) 2011 - 2012 Frank Kohlhepp
// https://github.com/frankkohlhepp/store-js
// License: MIT-license
//
(function () {
    var objectCount = function (obj) {
        var count = 0;
        for (member in obj) {
            if (obj.hasOwnProperty(member)) { count++; }
        }
        
        return count;
    };
    
    var arrayEach = function (arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            if (i in arr) { fn(arr[i], i, arr); }
        }
    };
    
    var Store = this.Store = function (name, defaults, watcherSpeed) {
        var that = this;
        this.name = name;
        this.defaults = defaults || {};
        this.watcherSpeed = watcherSpeed || 500;
        this.listeners = {};
        
        // Apply defaults
        this.applyDefaults();
        
        // Fake events
        var fireEvent = function (name, value) {
            arrayEach([name, "*"], function (selector) {
                if (that.listeners[selector]) {
                    arrayEach(that.listeners[selector], function (callback) {
                        callback(value, name, that.name);
                    });
                }
            });
        };
        
        var oldObj = this.toObject();
        var watcher = this.watcher = function (skipCheck) {
            if (objectCount(that.listeners) !== 0) {
                var newObj = that.toObject();
                
                if (!skipCheck) {
                    for (var key in newObj) {
                        if (newObj.hasOwnProperty(key) && newObj[key] !== oldObj[key]) {
                            fireEvent(key, newObj[key]);
                        }
                    }
                    
                    for (var key in oldObj) {
                        if (oldObj.hasOwnProperty(key) && !newObj.hasOwnProperty(key)) {
                            fireEvent(key, newObj[key]);
                        }
                    }
                }
                
                oldObj = newObj;
                setTimeout(watcher, this.watcherSpeed);
            }
        };
    };
    
    Store.clear = function () {
        localStorage.clear();
    };
    
    Store.prototype.applyDefaults = function () {
        for (var key in this.defaults) {
            if (this.defaults.hasOwnProperty(key) && this.get(key) === undefined) {
                this.set(key, this.defaults[key]);
            }
        }
        
        return this;
    };
    
    Store.prototype.get = function (name) {
        var value = localStorage.getItem("store." + this.name + "." + name);
        if (value === null) { return; }
        try { return JSON.parse(value); } catch (e) { return null; }
    };
    
    Store.prototype.set = function (name, value) {
        if (value === undefined) {
            this.remove(name);
        } else {
            if (typeof value === "function") {
                value = null;
            } else {
                try {
                    value = JSON.stringify(value);
                } catch (e) {
                    value = null;
                }
            }
            
            localStorage.setItem("store." + this.name + "." + name, value);
        }
        
        return this;
    };
    
    Store.prototype.remove = function (name) {
        localStorage.removeItem("store." + this.name + "." + name);
        return this.applyDefaults();
    };
    
    Store.prototype.reset = function () {
        var name = "store." + this.name + ".";
        for (var i = (localStorage.length - 1); i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        
        return this.applyDefaults();
    };
    
    Store.prototype.toObject = function () {
        var values = {};
        var name = "store." + this.name + ".";
        for (var i = (localStorage.length - 1); i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                var key = localStorage.key(i).substring(name.length);
                var value = this.get(key);
                if (value !== undefined) { values[key] = value; }
            }
        }
        
        return values;
    };
    
    Store.prototype.fromObject = function (values, merge) {
        if (!merge) { this.reset(); }
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                this.set(key, values[key]);
            }
        }
        
        return this;
    };
    
    Store.prototype.addEvent = function (selector, callback) {
        if (!this.listeners[selector]) { this.listeners[selector] = []; }
        this.listeners[selector].push(callback);
        this.watcher(true);
        return this;
    };
    
    Store.prototype.removeEvent = function (selector, callback) {
        for (var i = (this.listeners[selector].length - 1); i >= 0; i--) {
            if (this.listeners[selector][i] === callback) { this.listeners[selector].splice(i, 1); }
        }
        
        if (this.listeners[selector].length === 0) { delete this.listeners[selector]; }
        return this;
    };
}());
