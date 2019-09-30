import * as store from '../stores.js';
import * as model from  '../model/index.js'

const storeMap = {
  taskDB: 'todoCont',
  completeDB: 'completeCont',
  pendingDB: 'pendingCont',
}

/**
 * 
 * @param {*} storeObj { time, title: 'ttttt', desc: 'dddddd', progress: '50%' }
 */
export const addStore = async (storeName, storeObj) => {
  try {
    await model[storeName].save( storeObj );
    await handleStore(storeName)

  } catch (error) {
    console.error('db add error:', error);
  }

}

export const updateStore = async (storeName, id, storeObj) => {
  try {
    await model[storeName].update(id, storeObj)
    await handleStore(storeName)

  } catch (error) {
    console.error('db update error:', error);
  }
}

export const deleteStore = async (storeName, id) => {
  try {
    await model[storeName].delete(id);
    handleStore(storeName)
  } catch (error) {
    console.error('db delete error:', error);
  }
}

export const searchStore = async (storeName) => {
  try {
    const res = await handleStore(storeName)
  } catch (error) {
    console.error('db search error:', error);
  }
}

const handleStore = async (storeName) => {
  const totalRes = await model[storeName].search()
  store[storeMap[storeName]].update(() => totalRes)
}

