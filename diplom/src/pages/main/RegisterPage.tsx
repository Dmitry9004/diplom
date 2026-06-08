import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import {createEvent} from "effector";
import {loginUser, register, registerUserError} from "../auth/model.ts";
import {useUnit} from "effector-react";
import { useState } from "react";
import {useNavigate} from "react-router";

export const RegisterPage = () => {
    const registerHandler = useUnit(register)
    const errHandle = useUnit(registerUserError);

    const [login, setLogin] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [passF, setPassF] = useState<string>("");
    const [err, setErr] = useState<string>("");

    const checkPassword = () => {
        if (passF == pass) {
            registerHandler({login: login, pass: pass})
        } else {
            setErr("Пароли не совпадают")
        }
    }

    const nav = useNavigate();
    return (
        <Flex justifyContent={'center'} alignContent={'center'} width="100%"  height={'100vh'}>
            <Flex width="30%" margin={'auto'} flexDir={'column'} background={'white'} border={"1px solid silver"} borderRadius="5px" p={'10px'}>
                {err != "" || errHandle != "" && <Text color={"red"}>{err || errHandle}</Text> }
                <Text fontSize={"12px"}>Логин:</Text>
                <Input onChange={(e) => setLogin(e.target.value)}></Input>
                <Text fontSize={"12px"}>Пароль:</Text>
                <Input onChange={(e) => setPass(e.target.value)}></Input>
                <Text fontSize={"12px"}>Пароль еще раз:</Text>
                <Input onChange={(e) => setPassF(e.target.value)}></Input>


                <Button mt={"10px"} colorScheme={'green'} onClick={() => checkPassword()}>Зарегистрироваться</Button>
                <Button onClick={() => nav("/login")} marginTop={'10px'}>Войти</Button>
            </Flex>
        </Flex>
    );
}