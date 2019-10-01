import * as control from '../controller/index.js';

// 函数防抖
function debounce(fn, delay) {
  var timer;
  return function () {
    var _this = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}

/**
 * 处理进度条
 */
const handlePercentOrigin = (DBName, data) => {
  const {id, title, desc, progress, time} = data

  if(DBName === 'taskDB') {
    
    if(progress == 100) {
      control.deleteStore(DBName, id)
      control.addStore('completeDB', Object.assign({}, data, {progress: 100}))

    } else {
      // 正常更新
      control.updateStore(DBName, id, {progress, time})
    }
  }

  if(DBName === 'completeDB') {
    if(progress < 100) {
      
      // complete 删除
      // task 新增
      control.deleteStore(DBName, id)
      control.addStore('taskDB', {title, desc, progress, time})
    } 
  }

  if(DBName === 'pendingDB') {
    control.deleteStore(DBName, id)

    if(progress == 100) {

      // complete 新增
      control.addStore('completeDB', data)

    } else {
      // task 新增
      control.addStore('taskDB', {title, desc, progress, time})
    }
  }
  
}
export const handleTabPercent = debounce(handlePercentOrigin, 300)


/**
 * 删除
 */
export const handleTabDelete = (DBName, data) => {
  const { id } = data;
  control.deleteStore(DBName, id);

  if( DBName !== 'pendingDB' ) {
    // pendingDB增加
    control.addStore('pendingDB', data)
  }
}

/**
 * 处理置顶
 */
export const handleTabPin = (DBName, data) => {
  const { id } = data;
  control.updateStore(DBName, id, data);
}

