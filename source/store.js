//
// Copyright (c) 2011 Frank Kohlhepp
// https://github.com/frankkohlhepp/store-js
// License: MIT-license
//
(function () {
    this.Store = function (name) {
        // Creates a new prototype for every store
        // because the name variable is transmitted
        // via a closure.
        var storePrototype = {
            "save": function () {
                try {
                    localStorage.setItem(name, JSON.stringify(this));
                } catch (e) {
                    if (e.code === 22) {
                        throw "quotaExceeded";
                    } else {
                        throw "unknownError"
                    }
                }
                
                return this;
            },
            
            "remove": function () {
                localStorage.removeItem(name);
                
                // Restore to a clean store
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        delete this[key];
                    }
                }
                
                return this;
            }
        };
        
        var store = JSON.parse(localStorage.getItem(name) || "{}");
        store.__proto__ = storePrototype;
        return store;
    };
}());
