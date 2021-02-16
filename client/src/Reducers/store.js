import { createStore } from 'redux';
// import storage from 'redux-persist/lib/storage';
import rootReducers from './rootReducers';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('store')
      if (serializedState === null) {
        return undefined
      } else {
        return JSON.parse(serializedState)
      }
    } catch (error) {
      return undefined
    }
};

const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('store', serializedState)
    } catch (error) {
      console.log(error.message)
    }
};

const persistStore = loadState();
const store = createStore(rootReducers, persistStore);

store.subscribe(() => {
  saveState(store.getState())
});

export default store;