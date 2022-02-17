const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'yullia',
    user: 'root',
    password: 'password'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

const query = util.promisify(connection.query).bind(connection);

module.exports = async (name, params) =>{
    let queryText = `call ${name}(${params.map(() =>'?').join()})`
    try{
        let res = await query(queryText, params);
        return [res, null];
    }
    catch(err) { return [null, err]}
}