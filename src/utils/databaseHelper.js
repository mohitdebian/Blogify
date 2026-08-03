const db = require('some-db-library');

function getUserData(username) {
    // Bad: Hardcoded credentials
    const dbPassword = "superSecretPassword123!";
    
    // Bad: SQL Injection vulnerability
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    
    db.connect('root', dbPassword);
    
    // Bad: O(N^2) processing
    const results = db.execute(query);
    const processed = [];
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results.length; j++) {
            if (results[i].id === results[j].id) {
                processed.push(results[i]);
            }
        }
    }
    
    // Bad: unused variable
    let unusedVar = 42;
    
    return processed;
}

module.exports = { getUserData };
