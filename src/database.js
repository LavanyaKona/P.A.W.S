import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("users.db")

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);"
    )
  })
}

export const initDB = () => {
  createTable()
}

export const insertUser = (email, password) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO users (email, password) VALUES (?, ?);", [
      email,
      password,
    ])
  })
}

export const getUser = (email, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ?;",
      [email],
      (_, { rows }) => {
        callback(rows.item(0))
      }
    )
  })
}

export const getAllMemories = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM memories WHERE user_id = ?;",
      [userId],
      (_, { rows }) => {
        const memories = rows._array
        callback(memories)
      },
      (_, error) => {
        console.log("Error getting memories: ", error)
        callback([])
      }
    )
  })
}

export const getAllPets = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM pets WHERE user_id = ?;",
      [userId],
      (_, { rows }) => {
        const pets = rows._array
        callback(pets)
      },
      (_, error) => {
        console.log("Error getting pets: ", error)
        callback([])
      }
    )
  })
}

// export const getAllPets = (userId, callback) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "SELECT * FROM pets WHERE user_id = ?",
//       [userId],
//       (_, { rows: { _array } }) => {
//         callback(_array);
//       }
//     );
//   });
// };
