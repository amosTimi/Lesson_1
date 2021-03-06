// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg');

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
});

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    "INSERT INTO UserAmos2021 (FIRSTNAME, LASTNAME, BUSINESSNAME, EMAIL, PASSWORD, DATEOFBIRTH, COUNTRY) VALUES ('Amos', 'Agbetile', 'MicroSolutions & Company inc', 'timilehinamos@gmail.com', '12345abcde', '1998-05-25', 'Nigeria'),('Matthew', 'John', 'Nigeria Law School', 'matthewjohn@gmail.com', '12345abcde', '1996-09-29', 'Nigeria'),('Matthew', 'Adeniyi', 'MUSON', 'matthewadeniyi1@gmail.com', '12345a54de', '1997-12-06', 'Nigeria')",
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
        console.log(err);
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;