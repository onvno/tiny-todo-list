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
const handlePercentOrigin = (DBName, data, mode, sort) => {
  const {id, title, desc, progress, time} = data

  if(DBName === 'taskDB') {
    
    if(progress == 100) {
      control.deleteStore(DBName, id, mode, sort)
      control.addStore('completeDB', Object.assign({}, data, {progress: 100}), mode, sort)

    } else {
      // 正常更新
      control.updateStore(DBName, id, {progress, time}, mode, sort)
    }
  }

  if(DBName === 'completeDB') {
    if(progress < 100) {
      
      // complete 删除
      // task 新增
      control.deleteStore(DBName, id, mode, sort)
      control.addStore('taskDB', {title, desc, progress, time}, mode, sort)
    } 
  }

  if(DBName === 'pendingDB') {
    control.deleteStore(DBName, id, mode, sort)

    if(progress == 100) {

      // complete 新增
      control.addStore('completeDB', data, mode, sort)

    } else {
      // task 新增
      control.addStore('taskDB', {title, desc, progress, time}, mode, sort)
    }
  }
  
}
export const handleTabPercent = debounce(handlePercentOrigin, 300)


/**
 * 删除
 */
export const handleTabDelete = (DBName, data, mode, sort) => {
  const { id } = data;
  control.deleteStore(DBName, id, mode, sort);

  if( DBName !== 'pendingDB' ) {
    // pendingDB增加
    control.addStore('pendingDB', data, mode, sort)
  }
}

/**
 * 处理置顶
 */
export const handleTabPin = (DBName, data, mode, sort) => {
  const { id } = data;
  control.updateStore(DBName, id, data, mode, sort);
}

