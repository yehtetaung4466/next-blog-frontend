import { Activity } from "../utils/types";

export function updateLocalStorageArray(itemName:string, newValue:Activity) {
    // Check if the array exists in local storage
    const ls = localStorage.getItem(itemName)
    if (ls) {
      // Retrieve the array from local storage
      const myArray = JSON.parse(ls);
      // Push the new value to the array
      myArray.push(newValue);
      // Store the updated array in local storage
      localStorage.setItem(itemName, JSON.stringify(myArray));
    } else {
      // Create a new array with the new value
      const myArray = [newValue];
      // Store the new array in local storage
      localStorage.setItem(itemName, JSON.stringify(myArray));
    }
  }
  