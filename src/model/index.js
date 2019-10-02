const db = new Dexie("todo");

db.version(1).stores({
  todolist: '++id, time, title, desc, progress, pin',
  completelist: 'id, time, title, desc, progress, pin',
  pendinglist: 'id, time, title, desc, progress, pin',
});

function downSort(time) {//指定某个属性的排序
  return function (a,b) {
      return b[time] - a[time];
  }
}

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

  // 删除所有
  clear() {
    const { name } = this;

    return db[name].clear().then(function(){
      console.log('clear:', name)
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
  search(mode, sort) {
    // console.log('mode:', mode, ",sort:", sort)
    const { name } = this;

    return db[name].toArray( items => {
      // 提供一个简单排序

      const tempPin = [];
      const tempOther = [];

      items.forEach((item) => {
        item.pin ? tempPin.push(item) : tempOther.push(item)
      })

      const pinAry = tempPin.sort((a, b) => {
        return b.time - a.time
      })


      const otherAry = tempOther.sort((a, b) => {
        if(mode) {
          return sort ? (a[mode] - b[mode]) : (b[mode] - a[mode])
        } else {
          return b.time - a.time
        }
      })

      const resItems = pinAry.concat(otherAry)
      return resItems;
    })
      .catch(err => {
        console.log('e1111:', err)
      })
  }
}

export const taskDB = new StoreDB('todolist');
export const completeDB = new StoreDB('completelist');
export const pendingDB = new StoreDB('pendinglist');