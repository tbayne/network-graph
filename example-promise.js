function addPromise(a, b) {
    return new Promise(function (resolve, reject) {
        if ((typeof a === 'number') && (typeof b === 'number')) 
            resolve(a + b)
        else 
            reject("Error can't compute sum, check that both parameters are numbers")
    })
}

addPromise(8, 9)
    .then(function (result) {
        console.log("Result:", result);
    }, function (err) {
        console.log("Error:", err);
    });

addPromise("chicken", 9).then(function (result) {
    console.log("Result:", result);
}, function (err) {
    console.log("Error:", err);
});
