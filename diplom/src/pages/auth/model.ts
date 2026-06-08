import {createEffect, createEvent, createStore, sample} from "effector";
import {loginUserFx, redirectFx, registerUserFx} from "../main/effects.ts";

type TokenUserData = {
    token: string;
    refresh: string;
    expire: Date;
}

export const setTokenData = createEvent<TokenUserData>();
const $userToken = createStore<TokenUserData | null>(null)
$userToken.on(setTokenData, (_, val) => val)

export const loginUser = createEvent<{login: string, pass:string}>()
export const loginUserError = createStore<string>("")
export const registerUserError = createStore<string>("")

export const register = createEvent<{login: string, pass: string}>()

export const authCheck = createEvent();


sample({
    clock: register,
    filter: (data) => !!data.login && !!data.pass,
    target: registerUserFx,
})

sample({
    clock: loginUser,
    filter: (data) => !!data.login && !!data.pass,
    target: loginUserFx,
})

// adn set token to COOKIE and REFRESH_TOKEN
sample({
    clock: [registerUserFx.doneData, loginUserFx.doneData],
    target: setTokenData,
})
sample({
    clock: registerUserFx.fail,
    fn: () => "Такой пользователь уже существует",
    target: registerUserError,
})

sample ({
    clock: loginUserFx.fail,
    fn: () => "Пользователь не найден",
    target: loginUserError,
})

const getToken = createEffect(async() => {
    return {
        token:localStorage.getItem("access_token") ?? "",
        refresh: localStorage.getItem("refresh_token") ?? "",
        expire: localStorage.getItem("access_token_expire") ?? new Date(),
    } as TokenUserData;
})

const setTokenToCOOKIE = createEffect(async(token: TokenUserData)=> {
    localStorage.setItem("access_token", token.token)
    localStorage.setItem("refresh_token", token.refresh)
    localStorage.setItem("access_token_expire", token.expire.toDateString())
})

export const logoutUser = createEvent()

export const clearToken = createEffect(async()=> {
    localStorage.clear()
})


sample({
    clock: authCheck,
    target: getToken,
})

sample({
    clock: getToken.doneData,
    filter: (data) => data.token == "",
    fn: () => "/login",
    target: redirectFx,
})

sample({
    clock: logoutUser,
    target: clearToken,
})

sample({
    clock: setTokenData,
    target: setTokenToCOOKIE,
})

sample({
    clock: setTokenData,
    filter: (data) => !!data,
    fn: () => "/",
    target: redirectFx,
})