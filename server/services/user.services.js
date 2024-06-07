import { createAccessToken } from "../libs/jwt.js";
import { UserDto } from "../DTO/user.dto.js";
import { Usuario } from "../models/User.js";
import bcrypt from "bcryptjs";

export async function createUser(name, email, password) {
  try {
    const userFound = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (userFound) {
      throw new Error("The email is already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new Usuario({
      name,
      email,
      password: passwordHash,
    });

    const UsuarioGuardado = await newUser.save();

    return new UserDto(
      UsuarioGuardado.id,
      UsuarioGuardado.name,
      UsuarioGuardado.email
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signin(email, password) {
  try {
    const userFound = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!userFound) {
      throw new Error("Email does not exist");
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw new Error(" Password is incorrect");
    }

    const token = await createAccessToken({
      id: userFound.id,
      name: userFound.name,
    });

    
    return new UserDto(userFound.id, userFound.name, userFound.email, token);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id) {
  try {
    await Usuario.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

// export async function createUser(name, email, password) {
//   try {
//     const newUser = await Usuario.create({
//       name,
//       email,
//       password,
//     });
//     return new UserDto(
//       newUser.id,
//       newUser.name,
//       newUser.email,
//       newUser.password
//     );
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function getUserByEmail(email) {
//   try {
//     const user = await Usuario.findOne({ where: { email: email } });
//     if (user) {
//       return new UserDto(user.id, user.name, user.email, user.password);
//     } else {
//       return null;
//     }
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function getUsers() {
//   try {
//     const users = await Usuario.findAll({
//       attributes: ["id", "name", "email", "password"],
//     });
//     return users.map(
//       (user) => new UserDto(user.id, user.name, user.email, user.password)
//     );
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function updateUser(id, name, email, password) {
//   try {
//     const user = await Usuario.findByPk(id);
//     user.name = name;
//     user.email = email;
//     user.password = password;
//     await user.save();
//     return new UserDto(user.id, user.name, user.email, user.password);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function deleteUser(id) {
//   try {
//     await Usuario.destroy({
//       where: {
//         id,
//       },
//     });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
