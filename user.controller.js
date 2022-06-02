const db = require('./database');

class UserController {
  async getUsers(req, res) {
    if (req.query.mail) {
      const { mail, password } = req.query;
      const users = await db.query("SELECT * FROM users WHERE mail = $1 and password = $2", [mail, password]);

      if (users.rowCount) {        
        const user = await db.query(
          "UPDATE users SET lastvisit = $1 where id = $2 RETURNING *",
          [getFormattedDateTime(new Date()), users.rows[0].id]
        );

        res.json({ user: user.rows[0] });
      } else {
        res.status(400).json({});
      }
    }
    else {
      const users = await db.query("SELECT * FROM users");
      res.json({ users: users.rows });
    }
  }

  async createUser(req, res) {
    const { name, mail, password } = req.body;

    const newUser = await db.query(`INSERT INTO users (name, mail, password, status, createddate, lastvisit)
      values ($1, $2, $3, null, $4, null) RETURNING *`,
      [name, mail, password, getFormattedDateTime(new Date())]
    );

    res.json({ user: newUser.rows[0] });
  }

  async blockUser(req, res) {
    const id = +req.params.id;
    const user = await db.query("UPDATE users SET status = 'Blocked' where id = $1 RETURNING *", [id]);
    res.json({ user: user.rows[0] });
  }

  async blockAllUsers(req, res) {
    const users = await db.query("UPDATE users SET status = 'Blocked' where id = id RETURNING *");
    res.json({ user: users.rows });
  }

  async unblockUser(req, res) {
    const id = +req.params.id;
    const user = await db.query("UPDATE users SET status = null where id = $1 RETURNING *", [id]);
    res.json({ user: user.rows[0] });
  }

  async deleteUser(req, res) {
    const id = +req.params.id;
    const user = await db.query("DELETE FROM users where id = $1 RETURNING *", [id]);
    res.json({ user: user.rows[0] });
  }

  async deleteAllUsers(req, res) {
    const users = await db.query("DELETE FROM users where id = id RETURNING *");
    res.json({ user: users.rows });
  }
}

function getFormattedDateTime(dateTime) {
  const date = dateTime.toDateString();

  const getTimeNumberFormat = (num) => num < 10 ? "0" + num : num;
  
  const hours = getTimeNumberFormat(dateTime.getHours());
  const minutes = getTimeNumberFormat(dateTime.getMinutes());
  const seconds = getTimeNumberFormat(dateTime.getSeconds());
  
  return `${date}, ${hours}:${minutes}:${seconds}`;
}

module.exports = new UserController();