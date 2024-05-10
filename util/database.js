export const initDatabase = async (db) => {
 await db.execAsync(`CREATE TABLE IF NOT EXISTS places (
                      id INTEGER PRIMARY KEY NOT NULL,
                      title TEXT NOT NULL,
                      address TEXT NOT NULL,
                      imageUri TEXT NOT NULL,
                      lat REAL NOT NULL,
                      lng REAL NOT NULL
                    )`);
}

export const insertPlace = async (db, place) => {
  await db.runAsync(`INSERT INTO places (id, title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?)`,
      [null, place.title, place.imageUri, place.address, place.lat, place.lng])
};

export const getPlaces = async (db) => {
  return await db.getAllAsync('SELECT * FROM places');
}