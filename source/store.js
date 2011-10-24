//
// Copyright (c) 2011 Frank Kohlhepp
// https://github.com/frankkohlhepp/store-js
// License: MIT-license
//
(function () {
    var Store = this.Store = function (name, defaults, watcherSpeed) {
        var that = this;
        this.name = name;
        this.bindings = {};
        
        // Set defaults
        if (defaults) {
            for (var key in defaults) {
                if (defaults.hasOwnProperty(key) && this.get(key) === undefined) {
                    this.set(key, defaults[key]);
                }
            }
        }
        
        // Faked Events
        var fireEvent = function (name, value) {
            ([name, "*"]).each(function (selector) {
                if (that.bindings[selector]) {
                    that.bindings[selector].each(function (callback) {
                        callback(value, name, that.name);
                    });
                }
            });
        };
        
        var oldObj = this.toObject();
        (function watcher() {
            var newObj = that.toObject();
            
            for (var key in newObj) {
                if (newObj.hasOwnProperty(key) && newObj[key] !== oldObj[key]) {
                    fireEvent(key, newObj[key]);
                    oldObj = newObj;
                }
            }
            
            for (var key in oldObj) {
                if (oldObj.hasOwnProperty(key) && !newObj.hasOwnProperty(key)) {
                    fireEvent(key, newObj[key]);
                    oldObj = newObj;
                }
            }
            
            setTimeout(watcher, (watcherSpeed || 300));
        }());
    };
    
    Store.clear = function () {
        localStorage.clear();
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
        return this;
    };
    
    Store.prototype.removeAll = function () {
        var name = "store." + this.name + ".";
        for (var i = (localStorage.length - 1); i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        
        return this;
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
        if (!merge) { this.removeAll(); }
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                this.set(key, values[key]);
            }
        }
        
        return this;
    };
    
    Store.prototype.addEvent = function (selector, callback) {
        if (!this.bindings[selector]) { this.bindings[selector] = []; }
        this.bindings[selector].push(callback);
    };
    
    Store.prototype.removeEvent = function (selector, callback) {
        for (var i = (this.bindings[selector].length - 1); i >= 0; i--) {
            if (this.bindings[selector][i] === callback) { this.bindings[selector].splice(i, 1); }
        }
    };
}());
