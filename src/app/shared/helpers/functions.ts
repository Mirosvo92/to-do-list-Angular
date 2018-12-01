import {ToDoItemInterface} from '../interfaces/to-do.interface';

export function addFlagChanges(arr: ToDoItemInterface[]): void {
  arr.forEach( el => {
    el['isEditTitle'] = false;
    el['isEditDescription'] = false;
  });
}

export function disabledBut(button: {send: boolean}): void {
  button.send = true;
  setTimeout( () => {
    button.send = false;
  }, 1000);
}
