import { Button, Container, Group, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import apiFetch from "../lib/apiFetch";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await apiFetch.auth.login.post({
                email,
                password,
            })

            if (response.data?.token) {
                localStorage.setItem('token', response.data.token)
                window.location.href = '/dashboard'
                return
            }

            if (response.error) {
                alert(JSON.stringify(response.error))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Stack>
                <Text>Login</Text>
                <TextInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Group justify="right">
                    <Button onClick={handleSubmit} disabled={loading}>Login</Button>
                </Group>
            </Stack>
        </Container>
    )
}