import { Button, Card, Container, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import apiFetch from "../lib/apiFetch";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await apiFetch.auth.login.post({
                email,
                password,
            });

            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
                return;
            }

            if (response.error) {
                alert(JSON.stringify(response.error));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={420} py={80}>
            <Card shadow="sm" radius="md" padding="xl">
                <Stack gap="md">
                    <Title order={2} ta="center">
                        Login
                    </Title>

                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Group justify="flex-end" mt="sm">
                        <Button
                            onClick={handleSubmit}
                            loading={loading}
                            fullWidth
                        >
                            Login
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </Container>
    );
}
