import {createEffect, createEvent} from "effector";
import type {Brand} from "./model.tsx";
import {redirect, useNavigate} from "react-router";

const authRequest = async (url:any) => {
    const authToken = localStorage.getItem("access_token") ?? "";

    return await fetch(url, {
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
}

export const getSentimentsAllFx = createEffect(async () => {
    const url = "http://127.0.0.1:82/metrics/result/analysis/1";
    return await authRequest(url).then(res => res.json())
});

export const getAverageSentimentsAllFx = createEffect(async () => {
    const url = "http://127.0.0.1:82/metrics/result/average";
    return await authRequest(url).then(res => res.json());
});

export const getPDFFx = createEffect(async({from, to}:{from: string, to: string}) => {
    const url = "http://127.0.0.1:82/reports/pdf/between?from"+ from + "&to=" + to;

    const a = document.createElement("a");
    a.href = url;
    a.download = "result.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
export const getExcelFx = createEffect(async({from, to}:{from: string, to: string}) => {
    const url = "http://127.0.0.1:82/reports/excel/between?from"+ from + "&to=" + to;

    const a = document.createElement("a");
    a.href = url;
    a.download = "result.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

export const redirectFx = createEffect(async(page: string) => {
    window.location.href = page;
})

export const registerUserFx = createEffect(async({login, pass}: {login: string, pass: string}) => {
    const url = "http://103.112.71.189:82/users/register";


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            pass: pass,
        })
    });

    return response.json()
});
export const loginUserFx = createEffect(async({login, pass}:{login: string, pass: string}) => {
    const url = "http://103.112.71.189:82/users/login";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            pass: pass,
        })
    })

    return response.json()
});

export const updateBrandFx = createEffect(async(brand:Brand) => {
    const url = "http://103.112.71.189:8084/schedule";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            brand: brand.name,
            url: "https://www.banki.ru/services/responses/bank/sberbank/",
            source_type: "js",
        })
    })
        .then(res => res.json());

    const url2 = "http://103.112.71.189:82/analysis/1?from="+brand.name;
    await authRequest(url2);

    return response;
});

export const getTopWords = createEffect(async(brand:Brand) => {
    const url = "http://103.112.71.189:8083/words?brand="+brand.name+"&limit=10";
    return await authRequest(url).then(res => res.json());
})

export const getBrands = createEffect(async() => {
    const url = "http://103.112.71.189:8083/brands";
    return await authRequest(url).then(res => res.json());
})

export const getLastReviews = createEffect(async(brand:Brand) => {
    const url = "http://103.112.71.189:8083/reviews?brand="+brand.name+"&limit=50";
    return await authRequest(url).then(res => res.json());
})

