import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeDataToAsyncStorage = async <T>(key: string, value: T): Promise<void> => {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value)
  await AsyncStorage.setItem(key, serialized)
}

export const getDataFromAsyncStorage = async <T>(key: string): Promise<T | null> => {
  const raw = await AsyncStorage.getItem(key)

  if (raw === null) {
    return null
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return raw as unknown as T
  }
}

export const removeFromAsyncStorage = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key)
}
