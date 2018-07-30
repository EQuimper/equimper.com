/* tslint:disable no-console */

const localStorageGlobal = typeof window !== 'undefined' && window.localStorage

export const clearStorage = () =>
  localStorageGlobal && localStorageGlobal.clear()

export const getItemFromStorage = (key: string) => {
  if (!localStorageGlobal) {
    return
  }

  try {
    // @ts-ignore
    return JSON.parse(localStorageGlobal.getItem(key))
  } catch (err) {
    console.error(`Error getting item ${key} from localStoragee`, err)
  }
}

export const storeItem = (key: string, item: any) => {
  if (!localStorageGlobal) {
    return
  }

  try {
    return localStorageGlobal.setItem(key, JSON.stringify(item))
  } catch (err) {
    console.error(`Error storing item ${key} to localStoragee`, err)
  }
}

export const removeItemFromStorage = (key: string) => {
  if (!localStorageGlobal) {
    return
  }

  try {
    return localStorageGlobal.removeItem(key)
  } catch (err) {
    console.error(`Error removing item ${key} from localStoragee`, err)
  }
}
