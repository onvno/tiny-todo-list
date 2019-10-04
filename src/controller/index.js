import * as store from '../store/index.js';
import * as model from  '../model/index.js';
import { storeMap } from '../config/constant.js';


/**
 * 
 * @param {*} storeObj { time, title: 'ttttt', desc: 'dddddd', progress: '50%' }
 */
export const addStore = async (storeName, storeObj, mode, sort) => {
  try {
    await model[storeName].save( storeObj );
    await handleStore(storeName, mode, sort)

  } catch (error) {
    console.error('db add error:', error);
  }

}

export const updateStore = async (storeName, id, storeObj, mode, sort) => {
  try {
    await model[storeName].update(id, storeObj)
    await handleStore(storeName, mode, sort)

  } catch (error) {
    console.error('db update error:', error);
  }
}

export const deleteStore = async (storeName, id, mode, sort) => {
  try {
    await model[storeName].delete(id);
    handleStore(storeName, mode, sort)
  } catch (error) {
    console.error('db delete error:', error);
  }
}

export const clearStore = async (storeName, mode, sort) => {
  try {
    await model[storeName].clear();
    handleStore(storeName, mode, sort)
  } catch (error) {
    console.error('db delete error:', error);
  }  
}

export const searchStore = async (storeName, mode, sort) => {
  // mode - time, id, progress
  try {
    const res = await handleStore(storeName, mode, sort)

  } catch (error) {
    console.error('db search error:', error);
  }
}

export const countStore = async (storeName) => {
  try {
    return await model[storeName].count(storeName);
  } catch (error) {
    console.error('db count error:', error);
  }
}

export const forgetDaysConfig = async () => {
  const res = await model['configDB'].search()
  let days;
  
  if(res.length > 0) { 
    days = res[0].day
  } else {
    days = 365;
  }

  return days;  
}

export const countConfig = async () => {
  const res = await model['configDB'].search()
  let count;
  
  if(res.length > 0) { 
    count = res[0].number
  } else {
    count = 100;
  }

  return count;
}

const handleStore = async (storeName, mode, sort) => {
  const totalRes = await model[storeName].search(mode, sort)

  // 处理todo过期逻辑
  if( storeName === 'taskDB' ) {
    const keepRes = []

    const days = forgetDaysConfig();
    const nowTime = new Date().getTime();
    const expiredTime = nowTime - days * 86400000

    totalRes.forEach(item => {
      if(item < expiredTime) {
        // 存到回收站
        model['pendingDB'].save(item)

      } else {
        // 返回
        keepRes.push(item)

      }
    })

    store[storeMap['taskDB']].update(() => keepRes)

  } else {
    store[storeMap[storeName]].update(() => totalRes)
  }

}

