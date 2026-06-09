import {
    Box,
    Button,
    Flex,
    Link,
    Select,
    Skeleton,
    Stack,
    Table,
    TableCaption,
    TableContainer, Tbody, Td,
    Text, Th,
    Thead, Tr
} from "@chakra-ui/react";
import {useUnit} from "effector-react";
import {Calendar} from '@heroui/react';
import {DatePicker} from "chakra-ui-date-input";
import {
    $averagePending, $brands, $lastReviews, $pendingReviews, $pendingWords,
    $sentimentAndAverage,
    $sentimentPending, $topWords,
    getExcel, getPdf, setBrand,
    setFromDate,
    setToDate, updateBrand,
    uploadPage
} from "./model.ts";
import {getLastReviews} from "./effects.ts";
import {authCheck, logoutUser } from "../auth/model.ts";

const SimpleHeaderHref = ({text, href} : {text: string, href: string }) => {
    return (
        <Link href={href}>
            <Text>{text}</Text>
        </Link>
    )
}

const Header = () => {
    const logout = useUnit(logoutUser)

    return (
        <Box background={'white'} display={"flex"} flexDir={'row'} paddingY={'10px'} border={'1px solid silver'}>
            <Text marginLeft={'25px'} fontWeight={'bold'} fontSize={'24px'}>Мониторинг репутации</Text>

            <Flex gap="25px" marginRight={"25px"} direction={'row'} marginLeft={'auto'}  justifyContent={'space-between'} alignItems={'center'}>
                {/*{hrefs.map(href => (*/}
                {/*    <SimpleHeaderHref text={href[0]} href={href[1]} />*/}
                {/*))}*/}

                <Box onClick={()=>logout()}>
                    <SimpleHeaderHref text={"Выйти"} href={"/login"} />
                </Box>
            </Flex>
        </Box>
    )
}

const ExcelPdf = () => {
    const excel = useUnit(getExcel)
    const pdf = useUnit(getPdf)

    return (
        <Flex background={'white'} gap={"10px"} alignItems={'center'} pt={'20px'}>
            <Button colorScheme={'green'} onClick={() => pdf()}>PDF</Button>
            <Button colorScheme={'green'} onClick={() => excel()}>Excel</Button>
        </Flex>
    )
}

const UpdateBrand = () => {
    const update = useUnit(updateBrand);

    return (
        <Flex justifyContent={'center'} flexDir={"row"}>
            <Button color={"gray"} onClick={() => update()} margin={'auto'} ml={'20px'} mt={'30px'}>
                Обновить отызвы
            </Button>
        </Flex>
    )
}

const Functions = () => {
    const brands = useUnit($brands);
    const set = useUnit(setBrand);
    const setFrom = useUnit(setFromDate)
    const setTo = useUnit(setToDate)

    const setTargetBrand = (brand: string) => {
        set(brands.find(i => i.name === brand)!)
    }

    const parseFrom = ({str}:{str: string}) => {
        const arr = str.split('.')
        return new Date(parseInt(arr![2]!), parseInt(arr[1]), parseInt(arr[0]), 0, 0)
    }
    return (
        <Flex dir={'row'} background={'white'} marginX={"30px"} borderRadius={'10px'} paddingX={'10px'}>
            <Box p={'10px'}>
                <Text fontSize={'14px'}>Бренд</Text>
                <Select onClick={(e) => {
                    // @ts-ignore
                    setTargetBrand(e.target.value)}
                }>
                    {brands.map(brand => (
                        <option value={brand.name}>{brand.name}</option>
                    ))}
                </Select>
            </Box>
            <Box p={'10px'}>
                <Text fontSize={'14px'}>От</Text>
            <DatePicker
                placeholder='дд.мм.гггг'
                name='date'
                dateFormat='DD.MM.YYYY'
                onChange={(date: string) => setFrom(parseFrom({str:date}))}
            />
            </Box>
            <Box p={'10px'}>
                <Text fontSize={'14px'}>До</Text>
                <DatePicker
                    placeholder='дд.мм.гггг'
                    name='date'
                    dateFormat='DD.MM.YYYY'
                    onChange={(date: string) => setTo(parseFrom({str:date}))}
                />
            </Box>

            <ExcelPdf/>
            <UpdateBrand/>
        </Flex>
    );
}

const BlockSentiment = ({value}:{value: string}) => {
    return (
        <Flex background={'white'} justifyContent={'center'}>
            <Text color={"green"} align={'center'} fontWeight={'bold'} fontSize={'20px'}>{value}</Text>
        </Flex>
    );
}

const SentimentBody = () => {
    const items = useUnit($sentimentAndAverage);
    const averagePending = useUnit($averagePending);
    const sentimentPending = useUnit($sentimentPending);

    const negative = items?.sentiment?.find(it => it.type_metric_id == "sentiment_negative")
    const positive = items?.sentiment?.find(it => it.type_metric_id == "sentiment_positive")
    const neutral = items?.sentiment?.find(it => it.type_metric_id == "sentiment_neutral")

    return (
        <Flex dir='row' marginX={'20px'} paddingX={'10px'}  gap={"10px"} justifyContent={'space-between'}>
            <Flex flexDir={'column'} p={"10px"} gap={"10px"} background={'white'}  borderRadius={'10px'} width={'20%'}>
                <Text align={'center'} >{"Общий рейтинг"}</Text>
                <Skeleton height={"50px"} width={"50px"} isLoaded={!averagePending} margin={"auto"}>
                    <BlockSentiment value={items?.average?.toPrecision(2)+"%"} />
                </Skeleton>
            </Flex>

            <Flex flexDir={'column'} p={"10px"} gap={"10px"} background={'white'}  borderRadius={'10px'} width={'20%'}>
                <Text align={'center'} >{"Негативных"}</Text>
                <Skeleton height={"50px"} width={"50px"} isLoaded={!sentimentPending} margin={"auto"}>
                    <BlockSentiment value={negative?.value ?? ""} />
                </Skeleton>
            </Flex>

            <Flex flexDir={'column'} p={"10px"} gap={"10px"} background={'white'}  borderRadius={'10px'} width={'20%'}>
                <Text align={'center'} >{"Позитивных"}</Text>
                <Skeleton height={"50px"} width={"50px"} isLoaded={!sentimentPending} margin={"auto"}>
                    <BlockSentiment value={positive?.value ?? ""} />
                </Skeleton>
            </Flex>

            <Flex flexDir={'column'} p={"10px"} gap={"10px"} background={'white'}  borderRadius={'10px'} width={'20%'}>
                <Text align={'center'} >{"Нейтральных"}</Text>
                <Skeleton height={"50px"} width={"50px"} isLoaded={!sentimentPending} margin={"auto"}>
                    <BlockSentiment value={neutral?.value ?? ""} />
                </Skeleton>
            </Flex>

        </Flex>
    )
}
const TopWords = () => {
    const items = useUnit($topWords);
    const pending = useUnit($pendingWords)

    return (
        <Flex dir='columng' marginX={'20px'} paddingX={'10px'}  gap={"10px"} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Топ 10 слов по бренду</Text>
            <Skeleton height={'100px'} isLoaded={!pending}>
                {/*{items?.map(it => (*/}
                {/*    <Box>*/}
                {/*        <Text fontWeight={'bold'}>{it.word}</Text>*/}
                {/*        <Text fontWeight={'bold'} color={"green"}>{it.frequency}</Text>*/}
                {/*    </Box>*/}
                {/*))}*/}
            </Skeleton>
        </Flex>
    )
}

export const LastReviews = () => {
    const items = useUnit($lastReviews);
    const pending = useUnit($pendingReviews)

    return (<Box background={'white'} marginX={'25px'} borderRadius={'10px'}>

            <TableContainer>
                <Text align={'left'} fontWeight={'bold'} fontSize={'20px'} p={'20px'}>Последние отзывы</Text>
                <Table variant={"simple"}>
                    <Thead>
                        <Tr>
                            <Th>Заголовок</Th>
                            <Th>Текст</Th>
                            <Th>Рейтинг</Th>
                            <Th>Дата</Th>
                        </Tr>
                    </Thead>
                        <Tbody>
                            {items?.map(it => (
                                <Tr>
                                    <Td>{it.title}</Td>
                                    <Td><Box whiteSpace={'break-spaces'}>{it.text}</Box></Td>
                                    <Td>{it.rating}</Td>
                                    <Td>{it.review_date}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export const HomePage = () => {
    document.title = "Главная";
    const update = useUnit(uploadPage);
    const checkAuth = useUnit(authCheck)

    update();
    checkAuth();
    return (
        <Stack background={'#f0f0f0'} height={'100vh'}>
            <Header/>
            <Functions/>
            <SentimentBody />
            {/*<TopWords/>*/}
            <LastReviews/>
        </Stack>
    )
}