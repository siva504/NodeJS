const db = require('../db/db');

exports.getAllCustomers = (req, res) => {
    db.query('SELECT * FROM Customer_Details', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(result.rows);
        }
    });
};

exports.addCustomer = (req, res) => {
    const { name, age, role } = req.body;
    db.query('INSERT INTO Customer_Details(name, age, role) VALUES($1, $2, $3)', [name, age, role], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: "User added successfully", data: { Details: { name, age, role } } });
        }
    });
};

exports.updateCustomer = (req, res) => {
    const id = req.params.id;
    const { name, age, role } = req.body;
    db.query('UPDATE Customer_Details SET name = $1, age = $2, role = $3 WHERE id = $4', [name, age, role, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: `User modified with ID: ${id}`, data: { Details: { id, name, age, role } } });
        }
    });
};

exports.deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM Customer_Details WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.rowCount === 0) {
                res.status(404).json({ message: `User with ID ${id} not found or already deleted` });
            } else {
                const { name, age, role } = req.body;
                res.status(202).json({ message: `User Deleted with ID: ${id}`, data: { Details: { id, name, age, role } } });
            }
        }
    });
};
