import {combine, createEffect, createEvent, createStore, sample} from "effector";
import {
    getAverageSentimentsAllFx, getBrands,
    getExcelFx, getLastReviews,
    getPDFFx,
    getSentimentsAllFx,
    getTopWords,
    updateBrandFx
} from "./effects.ts";
import {number} from "framer-motion";

export const uploadPage = createEvent();

type SentimentBlock = {
    type_metric_id:string,
    value: string
}

export const $sentiment = createStore<SentimentBlock[]>([]);
export const $average = createStore<number>(0);

export const $averagePending = getAverageSentimentsAllFx.pending;
export const $sentimentPending = getSentimentsAllFx.pending;

$average.on(getAverageSentimentsAllFx.doneData, (_, all) => {
    return all;
})
$sentiment.on(getSentimentsAllFx.doneData, (_, data) => {
    return data;
})

export const $sentimentAndAverage = combine({
    sentiment: $sentiment,
    average: $average,
})

sample({
    clock: uploadPage,
    target: [getAverageSentimentsAllFx, getSentimentsAllFx, getBrands],
})

export const setFromDate = createEvent<Date>();
export const setToDate = createEvent<Date>();

export const $fromDate = createStore<Date | null>(null);
export const $toDate = createStore<Date | null>(null);

$fromDate.on(setFromDate, (_, date) => date);
$toDate.on(setToDate, (_, date) => date);

export const getPdf = createEvent();
export const getExcel = createEvent();

sample({
    clock: getExcel,
    source: {
        from: $fromDate,
        to: $toDate,
    },
    fn: ({from, to}) => {
        return ({
            from: Math.floor(from?.getTime() ?? 0 / 1000)+'',
            to: Math.floor(to?.getTime() ?? 0 / 1000)+'',
        })
    },
    target: getExcelFx,
})


sample({
    clock: getPdf,
    source: {
        from: $fromDate,
        to: $toDate,
    },
    fn: ({from, to}) => {
        return ({
            from: Math.floor(from?.getTime() ?? 0 / 1000)+"",
            to: Math.floor(to?.getTime() ?? 0 / 1000)+"",
        })
    },
    target: getPDFFx,
})

export type Brand = {
    brand: string,
    name: string,
    id: string,
    url: string,
    source_type: string
};

export const $brands = createStore<Brand[]>([])
$brands.on(getBrands.doneData, (_, data)=> {
    // @ts-ignore
    return data.brands
})
export const setBrand = createEvent<Brand>();

const $targetBrand = createStore<Brand | null>(null)
$targetBrand.on(setBrand, (_, data) => {
    return data;
})
export const updateBrand = createEvent();

sample({
    clock: updateBrand,
    filter: (i) => !!i,
    source: $targetBrand,
    target: updateBrandFx,
})


sample({
    clock: $brands,
    source: $targetBrand,
    filter: (val) => !val,
    fn: (_, val) => val[0],
    target: setBrand,
})


type TopWord = {
    word: string
    frequency: number
}

export const $topWords = createStore<TopWord[]>([])
export const $pendingWords = getTopWords.pending;
$topWords.on(getTopWords.doneData, (_, data) => data)

sample({
    clock: setBrand,
    target: getTopWords,
})

type Review = {
    title: string,
    text: string,
    rating: string,
    review_date: string,
}

export const $pendingReviews = getLastReviews.pending;
export const $lastReviews = createStore<Review[]>([])
$lastReviews.on(getLastReviews.doneData, (_, data) => {
    return data.reviews
})

sample({
    clock: setBrand,
    target: getLastReviews
})

