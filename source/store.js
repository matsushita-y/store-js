//
// Copyright (c) 2011 Frank Kohlhepp
// License: MIT-license
// https://github.com/frankkohlhepp/store-js
//
(function () {
    this.Store = function (name) {
        var storePrototype = {
            "save": function () {
                var stringifiedObj = JSON.stringify(this);
                localStorage.setItem(name, stringifiedObj);
                
                if (localStorage.getItem(name) !== stringifiedObj) {
                    throw "savingFailed";
                } else {
                    return this;
                }
            },
            
            "remove": function () {
                localStorage.removeItem(name);
            }
        };
        
        var store = JSON.parse(localStorage.getItem(name) || "{}");
        store.__proto__ = storePrototype;
        return store;
    };
})();
