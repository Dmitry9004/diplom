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

export const register = createEvent<{login: string, pass: string}>()

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
sample ({
    clock: loginUserFx.fail,
    fn: () => "Пользователь не найден",
    target: loginUserError,
})


const setTokenToCOOKIE = createEffect(async(token: TokenUserData)=> {
    localStorage.setItem("access_token", token.token)
    localStorage.setItem("refresh_token", token.refresh)
    localStorage.setItem("access_token_expire", token.expire.toDateString())
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