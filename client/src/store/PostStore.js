import { makeAutoObservable } from 'mobx';

class PostStore {

  constructor() {
    makeAutoObservable(this);
    this._isAuth = false;
    this._user = {};
    this._posts = {};
    this._post = {};
    this._page = 1;
  }

  setPosts (Posts) {
    this._posts  = Posts;
  }

  setPost(Post) {
    this._post = Post;
  }

  get posts () {
    return this._posts
  }

  get post() {
    return this._posts
  }
}

export default PostStore;