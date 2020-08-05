import * as SQLite from 'expo-sqlite';

export default class ToDoListDB{

    constructor(dbname){
        this.dbName = dbname;
        this.db = SQLite.openDatabase(dbname);
    }

    addItem(item) {
        this.db.transaction(
            (tx) => {
                tx.executeSql(
                    "CREATE TABLE if not exists 'listitems' ('i' int(11) primary key NOT NULL,'value' text NOT NULL,'isChecked' tinyint(1) NOT NULL)",
                    []
                );
                tx.executeSql(
                    "INSERT INTO listitems (`i`, `value`, `isChecked`) VALUES (?, ?, ?);",
                    [item.index, item.value, item.isChecked]
                )
            }
        );
    }

    _selectAllItems(){
        return new Promise((resolve, reject) => {
            this.db.transaction(
                (tx) => {
                    tx.executeSql(
                        "SELECT * FROM listitems",
                        [],
                        (_, resultSet) => { resolve(resultSet.rows._array)},
                        () => { reject([]) }
                    )
                }
            )
        });
    }

    async getAllItems(){
        return await this._selectAllItems();
    }

    clearDB(){
        this.db.transaction(
            (tx) => {
                tx.executeSql(
                    "DELETE FROM listitems;",
                    [],
                )
            }
        )
    }

}