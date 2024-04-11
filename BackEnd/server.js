var express=require('express');
const { Client} = require('pg');

var bodyParser =require('body-parser');

var cors=require('cors');

const client = new Client({
	user: 'postgres',
	password: 'siva@123',
	host: 'localhost',
	port: 5432,
	database: 'Customer',
});

var app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

client.connect()    
.then(()=>{
    console.log("Postgresql database was connected");
}).catch((err)=>{
    console.log("error in databases", err);
})

app.get('/',(req,res)=>{
    res.send("He,llo_World");
})

app.get('/Customer_Details',(req,res)=>{
    client.query('select * from Customer_Details order by id asc',(err,result)=>{
        if(err){
            throw err;
        }else{
            res.status(200).json(result.rows);
            
        }
    })
})

app.post('/Customer_Details',(req,res)=>{
    const { name, age, role}=req.body
    client.query('insert into Customer_Details(name,age,role)values($1,$2,$3)',[name,age,role],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.status(201).json({ 
                message: "User added successfully", 
                data:{
                    Details:{name, age, role }
                }
            });
        }
    })
})

app.put('/Customer_Details/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, role } = req.body;

    client.query(
        'UPDATE Customer_Details SET name = $1, age = $2, role = $3 WHERE id = $4',
        [name, age, role, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({
                    message: `User modified with ID: ${id}`,
                    data: {
                        Details: { id, name, age, role }
                    }
                });
            }
        }
    );
});

app.delete('/Customer_Details/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    client.query('delete from Customer_Details where id=$1',[id],(err,result)=>{
        if(err){
            console.error(err);
            res.status(500).json({err:"Internal server error"})
        }else {
            if (result.rowCount === 0) {
                res.status(404).json({ message: `User with ID ${id} not found or already deleted` });
            } else {
                const { name, age, role } = req.body;
                res.status(200).json({
                    message: `User Deleted with ID: ${id}`,
                    data: {
                        Details: { id, name, age, role }
                    }
                });
            }
        }
    })
})


app.listen(5000,()=>{
    console.log("server starting with port number 5000");
})