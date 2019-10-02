import * as store from '../stores.js';
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

const handleStore = async (storeName, mode, sort) => {
  const totalRes = await model[storeName].search(mode, sort)
  store[storeMap[storeName]].update(() => totalRes)
}

