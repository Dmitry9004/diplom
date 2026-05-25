import {Box, Button, Flex, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import {createEffect, createEvent, createStore, sample} from "effector";
import { useUnit } from "effector-react";

type Brand = {
    name: string;
}

export const loadBrandsPage = createEvent();

export const setBrands = createEvent()
const $brands = createStore<Brand[]>([]);
$brands.on(setBrands, (_, items) => items);

export const getBrandsFx = createEffect(async() => {})

sample({
    clock: loadBrandsPage,
    target: getBrandsFx,
})

sample({
    clock: getBrandsFx.doneData,
    target: setBrands,
})

export const BrandPage = () => {
    const nav = useNavigate();
    const brandsUser = useUnit($brands);
    const loadPage = useUnit(loadBrandsPage);
    loadPage()

    return (
        <Box>
            <Flex flexDir={"row"} background={'white'} justify={'center'}>
                <Flex gap="10px" flexDir={'row'} justifyContent={'center'} alignContent={'center'}>
                    <Text fontSize={'32px'} fontWeight={'bold'}>Управление брендами</Text>
                    <Flex margin={'auto'} gap={'10px'}>
                    <Button colorScheme="green" onClick={() => nav("/")}>Назад</Button>
                    <Button colorScheme="green">Добавить бренд</Button>
                    </Flex>
                </Flex>
            </Flex>
            <hr/>

            <Flex>

            </Flex>
        </Box>
    )
}