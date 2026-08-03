function logInfo(msg) {
    // Bad: console.log left in code
    console.log("INFO: " + msg);
    
    // Bad: Eval usage
    eval("console.log('eval test')");
}

module.exports = { logInfo };
