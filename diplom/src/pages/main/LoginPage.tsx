import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import {createEvent} from "effector";
import {loginUser, loginUserError} from "../auth/model.ts";
import {useUnit} from "effector-react";
import { useState } from "react";
import {useNavigate, useNavigation} from "react-router";

export const LoginPage = () => {
    document.title = "Войти";
    const loginHandler = useUnit(loginUser)
    const errHandle = useUnit(loginUserError)

    const [login, setLogin] = useState<string>("");
    const [pass, setPass] = useState<string>("");



    const nav = useNavigate();
    return (
        <Flex justifyContent={'center'} alignContent={'center'} width="100%" height={'100vh'}>
            <Flex margin={'auto'} flexDir={'column'} background={'white'} border={"1px solid silver"} borderRadius="5px" p={'10px'}>
                {errHandle != "" && <Text color={"red"}>{errHandle}</Text> }
                <Text fontSize={"12px"}>Логин:</Text>
                <Input onChange={(e) => setLogin(e.target.value)}></Input>
                <Text fontSize={"12px"}>Пароль:</Text>
                <Input onChange={(e) => setPass(e.target.value)}></Input>

                <Button mt={"10px"} colorScheme={'green'} onClick={() => loginHandler({login: login, pass: pass})}>Войти</Button>
                <Button onClick={() => nav("/register")} marginTop={'10px'}>Зарегистрироваться</Button>
            </Flex>
        </Flex>
    );
}