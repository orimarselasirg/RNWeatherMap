import { openDatabase } from 'react-native-sqlite-storage'
import { Markers } from '../interface/Markers';
import { User } from '../service/entities/login.entities';

const db = openDatabase(
  {
    name:     'weather_sqlite',
    location: 'default',
  },
  () => {
    console.log('Base de datos creada');
  },
  error => {
    console.log('Error: ', error);
  }
);

export const markerTables = async(tableName: string) => {
  try {
    await db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          latitude REAL, 
          longitude REAL, 
          name VARCHAR(24), 
          descrption VARCHAR(24), 
          icon VARCHAR(24), 
          tempereture REAL
        )`
      ),
      [],
      ()=> {
        console.log(`Tabla ${tableName} creada con exito`);
      },
      (error: any) => {
        console.log('Error al crear la tabla ', error);
      };
    });
  } catch (error) {
    console.log({error});
  }
}
export const sessionTable = async(tableName: string) => {
  try {
    await db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          username VARCHAR(48),
          datetime VARCHAR(48),
          is_active INTEGER
        )`
      ),
      [],
      ()=> {
        console.log(`Tabla ${tableName} creada con exito`);
      },
      (error: any) => {
        console.log('Error al crear la tabla ', error);
      };
    });
  } catch (error) {
    console.log({error});
  }
}

export const insertIntoTable = async(tableName: string, values: Markers) => {
  if (!db) {
    console.error('Database no inicializada');
    return;
  }
  try {
    await db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${tableName} (latitude, longitude, name, descrption, icon, tempereture) VALUES (?, ?, ?, ?, ?, ?)`,
        [values.latitude, values.longitude, values.name, values.descrption, values.icon, values.tempereture],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        },
        error => {
          console.log('Error al insertar en la tabla: ', error);
        }
      );
    });
  } catch (error) {
    console.log({error});
  }
}

export const insertIntoSessionTable = async(tableName: string, values: any) => {
  if (!db) {
    console.error('Database no inicializada');
    return;
  }
  try {
    const data = await getUserSessionData('sessionTable')
    if (data?.is_active === 1) return
    await db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${tableName} (username, datetime, is_active) VALUES (?, ?, ?)`,
        [values.username, values.date, values.active],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
        },
        error => {
          console.log('Error al insertar en la tabla: ', error);
        }
      );
    });
  } catch (error) {
    console.log({error});
  }
}

export const getMarkersData = async (tableName: string): Promise<Markers[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (tx, results) => {
          let data: Markers[] = [];
          const len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row: Markers = results.rows.item(i);
              data.push(row);
            }
            resolve(data);
          } else {
            console.log('Registros no encontrados');
            resolve([]);
          }
        },
        error => {
          console.log('Error al traer la data: ', error);
          reject(error);
        }
      );
    });
  });
};

export const getUserSessionData = async (tableName: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (tx, results) => {
          let data: any[] = [];
          const len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row: any = results.rows.item(i);
              data.push(row);
            }
            const sessionActive = data.filter(e => e.is_active === 1)
            resolve(sessionActive[0]);
          } else {
            console.log('Registros no encontrados');
          }
        },
        error => {
          console.log('Error al traer la data: ', error);
          reject(error);
        }
      );
    });
  });
};

export const closeSession = async(id: number) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE sessionTable SET is_active = ? WHERE id = ?',
      [0, id],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
      },
      error => {
        console.log('Error al actualizar el registro: ', error);
      }
    );
  });
}

export const deleteTable = async (tableName: string) => {
  try {
    await db.transaction(txn => {
      txn.executeSql(
        `DROP TABLE IF EXISTS ${tableName}`,
        [],
        () => {
          console.log(`Tabla ${tableName} borrada con éxito`);
        },
        (error: any) => {
          console.log('Error al borrar la tabla: ', error);
        }
      );
    });
  } catch (error) {
    console.log('Error en la transacción:', error);
  }
};

export const deleteMarker = (id: number, tableName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${tableName} WHERE id = ?`,
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          resolve(true)
        },
        error => {
          console.log('Error al borrar el registro: ', error);
          reject(false)
        }
      )
    });
  })
}
