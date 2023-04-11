import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import AllReducers from './reducers';
// Lưu trữ state của ứng dụng vào LocalStorage
function saveStateToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('appState', serializedState);
    } catch (e) {
      console.error('Failed to save state to LocalStorage:', e);
    }
  }
  
  // Lấy state của ứng dụng từ LocalStorage
  function loadStateFromLocalStorage() {
    try {
      const serializedState = localStorage.getItem('appState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.error('Failed to load state from LocalStorage:', e);
      return undefined;
    }
  }
  
  // Khởi tạo Redux store với state được lấy từ LocalStorage
  const persistedState = loadStateFromLocalStorage();
  const store = createStore(AllReducers, persistedState,applyMiddleware(thunk));
  
  // Lưu trữ state của ứng dụng vào LocalStorage mỗi khi state thay đổi
  store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });
export default store;