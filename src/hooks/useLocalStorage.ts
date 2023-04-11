import { useState } from 'react'

type LocalStorage<T> = [T, (newValue: T) => void]

export const useLocalStorage = <T>(
  keyName: string,
  defaultValue: T
): LocalStorage<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (newValue: T): void => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {}
    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
