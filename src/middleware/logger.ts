import {Action, State} from "../types";
import {Middleware} from 'redux';
const logger: Middleware<{}, State> = (store: {getState: Function}) => (next: Function) => (action: Action) => {
  console.group(action.type)
    console.log('The action is: ', action)
    const returnValue = next(action)
    console.log(store.getState())
  console.groupEnd()
  return returnValue
}

export default logger;