const { hash } = require("bcryptjs");
const AppError = require('../utils/AppError');

const sqliteConnection = require("../database/sqlite");

class UsersController {
   async create(request, response) {
      const { name, email, password } = request.body;

      const database = await sqliteConnection();
      const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if (checkUsersExists){
        throw new AppError("Esta e-mail já esta em uso.");
      }

      const hashedPassword =  await hash(password, 8);

      await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
      );


      return response.status(201).json();
    }
    async update(request,response) {
      const { name, email } = request.body;
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

      if (!user) {
        throw new AppError("Usuario nao encontrado")
      }
      const userWitupdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

      if(userWitupdatedEmail && userWitupdatedEmail.id !== id){
        throw new AppError("Esse e-mail ja esta em uso.");
      }

      user.name = name;
      user.email = email;

      await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      update_at = ?,
      WHERE id = ?`,
      [user.name,user.email, new Date(), id]
      );

    }
}
  
  module.exports = UsersController;