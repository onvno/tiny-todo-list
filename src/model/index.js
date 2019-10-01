const db = new Dexie("todo");

db.version(1).stores({
  todolist: '++id, time, title, desc, progress',
  completelist: 'id, time, title, desc, progress',
  pendinglist: 'id, time, title, desc, progress',
});

class StoreDB {
  constructor(name) {
    this.name = name
  }

  // 存
  save(obj) {
    const { name } = this;
    
    return db[name].put(obj).then (function(key){
      return db[name].get(key);
    }).then(function (data) {
      return data;
    }).catch(function(error) {
      console.error("store error:", error);
    });  
  }

  // 删
  delete(id) {
    const { name } = this;

    return db[name].delete(id).then(function(){
      console.log('del:', id)
    }).catch(function(error) {
      console.error("del error:", error);
    })
  }


  // 改
  update(key, obj) {
    const { name } = this;

    return db[name].update(key, obj).then(function (updated) {
      if (updated)
        console.log ("updated");
      else
        console.log ("Nothing was updated");
    });
  }

  // 查
  search() {
    const { name } = this;

    return db[name].toArray( items => items)
      .catch(err => {
        console.log('e1111:', err)
      })
  }
}

export const taskDB = new StoreDB('todolist');
export const completeDB = new StoreDB('completelist');
export const pendingDB = new StoreDB('pendinglist');