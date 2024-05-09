import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('places.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql
      (
          `CREATE TABLE IF NOT EXISTS places (
                      id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL,
                      address TEXT NOT NULL,
                      imageUri TEXT NOT NULL,
                      lat REAL NOT NULL,
                      lng REAL NOT NULL
                    )`,
          [],
          () => {
            resolve()
          },
          (_, err) => {
            reject(err)
          }
      );
    });
  });
}

export const insertPlace = (place) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
          `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
          [place.title, place.imageUri, place.address, place.lat, place.lng],
          (_, result) => {
            resolve(result)
          },
          (_, error) => {
            reject(error)
          }
      )
    })
  })
};

export const getPlaces = () => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM places',
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
      )
    })
  })
}