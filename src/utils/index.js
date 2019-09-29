const db = new Dexie("todo");

db.version(1).stores({
  todolist: '++id, time, title, desc, progress'
});

const todoDB = {
  // 存
  save: (obj) => {
    return db.todolist.put(obj).then (function(key){
      return db.todolist.get(key);
    }).then(function (data) {
      return data;
    }).catch(function(error) {
      console.error("store error:", error);
    });  
  },

  // 删
  delete: (time) => {
    return db.todolist.delete(time).then(function(){
      console.log('del:', time)
    }).catch(function(error) {
      console.error("del error:", error);
    })
  },

  // 改
  update: (key, obj) => {
    return db.todolist.update(key, obj).then(function (updated) {
      if (updated)
        console.log ("updated");
      else
        console.log ("Nothing was updated");
    });
  },

  // 查
  search: () => {
    return db.todolist.toArray( items => items)
      .catch(err => {
        console.log('e1111:', err)
      })
  },

}




export default todoDB;