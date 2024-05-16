"use strict";

function cs142MakeMultiFilter(originalArray) {
    let arr = originalArray;

    function arrayFilterer(filterCriteria, callback) {
        
        if (typeof filterCriteria  !== 'function') {
            return arr;
        } else {
            arr = arr.filter(filterCriteria);
        }

        if (typeof callback === 'function') {
            callback.call(originalArray, arr);
        }

        return arrayFilterer;
    }

    return arrayFilterer;
}

