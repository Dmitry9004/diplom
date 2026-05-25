import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import {createEvent} from "effector";
import {loginUser, register} from "../auth/model.ts";
import {useUnit} from "effector-react";
import { useState } from "react";
import {useNavigate} from "react-router";

export const RegisterPage = () => {
    const registerHandler = useUnit(register)

    const [login, setLogin] = useState<string>("");
    const [pass, setPass] = useState<string>("");


    const nav = useNavigate();
    return (
        <Flex justifyContent={'center'} alignContent={'center'} width="100%"  height={'100vh'}>
            <Flex margin={'auto'} flexDir={'column'} background={'white'} border={"1px solid silver"} p={'10px'}>
                <Text fontSize={"12px"}>Логин:</Text>
                <Input onChange={(e) => setLogin(e.target.value)}></Input>
                <Text fontSize={"12px"}>Пароль:</Text>
                <Input onChange={(e) => setPass(e.target.value)}></Input>
                <Button mt={"10px"} colorScheme={'green'} onClick={() => registerHandler({login: login, pass: pass})}>Зарегистрироваться</Button>

                <Button onClick={() => nav("/login")} marginTop={'10px'}>Войти</Button>
            </Flex>
        </Flex>
    );
}