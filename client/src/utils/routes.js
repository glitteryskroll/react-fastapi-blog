import AdminPanel from "../pages/AdminPanel";
import Auth from "../pages/Auth";
import CreatePost from "../pages/CreatePost";
import FeedApp from "../pages/Feed";
import Post from "../pages/Post";
import Registration from "../pages/Registration";
import Settings from "../pages/Settings";
import { ADMIN_PANEL, AUTH_ROUTE, CREATE_POST_ROUTE, FEED_ROUTE, POST_ROUTE, REGISTER_ROUTE, SETTINGS_ROUTE } from "./consts";

export const AUTH_ROUTES = [
    {
        path: SETTINGS_ROUTE,
        page: Settings
    },
    {
        path: CREATE_POST_ROUTE,
        page: CreatePost
    },
    {
        path: FEED_ROUTE,
        page: FeedApp
    },
    {
        path: POST_ROUTE,
        page: Post
    }
]

export const NOT_AUTH_ROUTES = [
    {
        path: AUTH_ROUTE,
        page: Auth
    },
    {
        path: REGISTER_ROUTE,
        page: Registration
    }

]

export const ADMIN_ROUTES = [
    {
        path: ADMIN_PANEL,
        page: FeedApp
    }
]