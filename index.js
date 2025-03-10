const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Connect the database.
const con = mysql.createConnection(
    {
        database:"assig",
        host:'localhost',
        user:'root',
        password:''
    }
)

con.connect((err)=>{
    if(err){
        console.log(err);
        return;   
    }
    console.log('server connected');
})

// For the get api's data here
app.use(bodyParser.json());

// Start api's here
// Create the user
app.post('/user', function name(req, res) {
    // Get data from user.
    const name = req.body.emp_name;
    const emp_join = req.body.emp_join;

    // Make Sql query
    let sql = `
        INSERT INTO employee (emp_name, emp_join_date) VALUES('${name}', '${emp_join}')
        `;
    // Execute sql query
    con.query(sql, (err, result) => {
        // 
        if(err){ 
            console.log(err);
            res.send({"error":"Something went wrong."});
            return;
        }

        // Send success response.
        res.send({"success":"User created."})
        return;

    });
})

// Start api's here
// Delete the user
app.delete('/user', function name(req, res) {
    // Get data from the user
    const emp_id = req.body.emp_id;
    
    // Make select query for the delete user
    let sql = `
        SELECT emp_id FROM employee WHERE emp_id = ${emp_id}
        `;

    // Execute the sql query
    con.query(sql, (err, result) => {
        if(err){ console.log(err);}

        // Make delete query for the user
        let del_sql = `
            DELETE FROM employee WHERE emp_id = ${emp_id}
        `;

        // Execute sql query
        con.query(del_sql, (err, result) => {
            // 
            if(err){ 
                console.log(err);
                res.send({"error":"Something went wrong."});
                return;
            }

            // Send success response.
            res.send({"success":"User deleted."})
            return;
        });
    });
    
})


// Start server here.
app.listen(port, (err) => { 
    if(err){ console.log(err);    }
    console.log('server connected ' + port);    
})