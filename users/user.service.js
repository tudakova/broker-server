const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

module.exports = {
    authenticate,
    signup
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password ===
        password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function signup({firstname, lastname, username, password}) {
    const user = users.find(u => u.username === username);
    if (!user) {
        users.push({id: users.length + 1, username: username, password: password, firstName: firstname, lastName: lastname, role: Role.User});
    }
    return !user;
}