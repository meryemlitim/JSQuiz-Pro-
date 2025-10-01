const db = require("./db");

class User {
    static async findByEmail(email) {
        const [rows] = await db.query("SELECT * FROM User WHERE email = ?", [email]);
        return rows[0];
    }

    static async create(name, email) {
        const [result] = await db.query(
            "INSERT INTO User (name, email, password) VALUES (?, ?, '')",
            [name, email]
        );
        return { id: result.insertId, name, email };
    }

    static async findOrCreate(name, email) {
        let user = await User.findByEmail(email);
        if (!user) {
            user = await User.create(name, email);
        }
        return user;
    }
}

module.exports = User;
