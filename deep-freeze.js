'use strict'

// Performs a deep freeze on an object and all of it's nested objects
function deepFreeze(obj) {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object') deepFreeze(obj[prop])
        return Object.freeze(obj)
    })
    return obj
}