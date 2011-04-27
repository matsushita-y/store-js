//
// Copyright (c) 2011 Frank Kohlhepp
// https://github.com/frankkohlhepp/store-js
// License: MIT-license
//
(function () {
    var Store = this.Store = function (name) {
        this.name = name;
    };
    
    Store.__proto__.clear = function () {
        localStorage.clear();
        return this;
    };
    
    Store.__proto__.initWithDefaults = function (name, object) {
        var store,
            key;
        
        store = new Store(name);
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                if (store.get(key) === undefined) {
                    store.set(key, object[key]);
                }
            }
        }
        
        return store;
    };
    
    Store.prototype.get = function (name) {
        name = "store." + this.name + "." + name;
        if (!localStorage.hasOwnProperty(name)) { return undefined; }
        try {
            return JSON.parse(localStorage.getItem(name));
        } catch (e) {
            return null;
        }
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
        var name,
            i;
        
        name = "store." + this.name + ".";
        for (i = localStorage.length; i >= 0; i--) {
            if (localStorage.key(i) && localStorage.key(i).substring(0, name.length) === name) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        
        return this;
    };
    
    Store.prototype.toObject = function () {
        var object,
            name,
            i,
            key;
        
        object = {};
        name = "store." + this.name + ".";
        for (i = localStorage.length; i >= 0; i--) {
            if (localStorage.key(i) && localStorage.key(i).substring(0, name.length) === name) {
                key = localStorage.key(i).substring(name.length);
                object[key] = this.get(key);
            }
        }
        
        return object;
    };
    
    Store.prototype.fromObject = function (object, merge) {
        if (merge !== true) { this.removeAll(); }
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                this.set(key, object[key]);
            }
        }
        
        return this;
    };
}());
