import * as SQLite from "expo-sqlite";
import { IPlace, Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve: any, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageuri TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (t, error) => {
          reject(error);
          console.log(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function addPlace(place: IPlace) {
  const promise = new Promise((resolve: any, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageuri, lat, lng) VALUES (?, ?, ?, ?)`,
        [place.title, place.imageUri, place.location.lat, place.location.lng],
        (_, result) => {
          console.log(result);
          resolve();
        },
        (_, error) => {
          reject(error);
          console.log(error);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const parsedPlaces = result.rows._array.map((x) => {
            return new Place(
              x.title,
              x.imageuri,
              {
                lat: x.lat,
                lng: x.lng,
              },
              x.id
            );
          });
          resolve(parsedPlaces);
          console.log(result.rows._array);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id: string) {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id=?`,
        [id],
        (_, result) => {
          console.log(result.rows._array);
          let x = result.rows._array[0];
          resolve(
            new Place(
              x.title,
              x.imageuri,
              {
                lat: x.lat,
                lng: x.lng,
              },
              x.id
            )
          );
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

  return promise;
}
