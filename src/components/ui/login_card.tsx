import {Button} from "../ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "../ui/card";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import LOGO from "../../assets/Group 47556.svg";
import PasswordInput from "../password-input";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {ADMIN_SIGNIN} from "../../graphql/admin.ts";

export function CardWithForm() {
    // const {setAuth} = useContext(Context)
    const [currentPassword, setCurrentPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();


    const [AdminSignIn] = useMutation(ADMIN_SIGNIN)

    useEffect(() => {
        if (window.localStorage.getItem("login")) {
            navigate("/dashboard");
        }
    })

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {

            const res = await AdminSignIn({
                variables: {
                    phone: username,
                    password: currentPassword
                }
            })
            window.localStorage.setItem("token", res.data.AdminSignIn.token);
            // setAuth(true)
            navigate("/dashboard");
        } catch (e) {
            alert("wrong username or password")

        }
    };


    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className=" text-center text-2xl text-yellow-400">
                    <img className=" mx-auto h-[50px]" src={LOGO}></img>
                </CardTitle>
                <CardDescription className="text-center">
                    Welcome from Go Tuk Tuk
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Phone Number</Label>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="name"
                                placeholder="Please enter username"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Password</Label>
                            <PasswordInput
                                id="current_password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-between">
                <Button onClick={handleLogin} className="w-full">Login</Button>
                <p className="text-xs md:text-md my-[20px] text-gray-400">
                    Copyright © 2024 Go Tuk Tuk. All right reserved.
                </p>
            </CardFooter>
        </Card>
    );
}
