import { makeAutoObservable } from 'mobx';

class UserStore {

  constructor() {
    makeAutoObservable(this);
    this._isAuth = false;
    this._user = {}
  }

  clean(){
    this._isAuth = false;
    this._user = {}
  }
  setUserData(userData) {
    this._user = userData;
    this._isAuth = true;
  }

  get isAuth(){
    return this._isAuth
  }

  setIsAuth(bool){
    this._isAuth = bool;
  }

  get getUserData() {
    return this._user;
  }
}

export default UserStore;