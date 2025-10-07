import { Button, Card, Container, Group, Stack, Table, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import apiFetch from "@/lib/apiFetch";
import { showNotification } from "@mantine/notifications";

export default function ApiKeyPage() {
    return (
        <Container size="md" w={"100%"}>
            <Stack>
                <Text>API Key</Text>
                <CreateApiKey />
            </Stack>
        </Container>
    );
}

function CreateApiKey() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [expiredAt, setExpiredAt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const res = await apiFetch.api.apikey.create.post({ name, description, expiredAt });
        if (res.status === 200) {
            setName('');
            setDescription('');
            setExpiredAt('');
            showNotification({
                title: 'Success',
                message: 'API key created successfully',
                color: 'green',
            })
        }
        setLoading(false);
    }
    return (
        <Card >
            <Stack>
                <Text>API Create</Text>
                <TextInput label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextInput label="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <TextInput label="Expired At" placeholder="Expired At" type="date" value={expiredAt} onChange={(e) => setExpiredAt(e.target.value)} />
                <Group>
                    <Button variant="outline" onClick={() => { setName(''); setDescription(''); setExpiredAt(''); }}>Cancel</Button>
                    <Button onClick={handleSubmit} type="submit" loading={loading}>Save</Button>
                </Group>

                <ListApiKey />
            </Stack>
        </Card>
    );
}

function ListApiKey() {
    const [apiKeys, setApiKeys] = useState<any[]>([]);
    useEffect(() => {
        const fetchApiKeys = async () => {
            const res = await apiFetch.api.apikey.list.get();
            if (res.status === 200) {
                setApiKeys(res.data?.apiKeys || []);
            }
        }
        fetchApiKeys();
    }, []);
    return (
        <Card>
            <Stack>
                <Text>API List</Text>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Expired At</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiKeys.map((apiKey: any, index: number) => (
                            <tr key={index}>
                                <td>{apiKey.name}</td>
                                <td>{apiKey.description}</td>
                                <td>{apiKey.expiredAt.toISOString().split('T')[0]}</td>
                                <td>{apiKey.createdAt.toISOString().split('T')[0]}</td>
                                <td>{apiKey.updatedAt.toISOString().split('T')[0]}</td>
                                <td>
                                    <Button variant="outline" onClick={() => { 
                                        apiFetch.api.apikey.delete.delete({ id: apiKey.id })
                                        setApiKeys(apiKeys.filter((api: any) => api.id !== apiKey.id))
                                    }}>Delete</Button>
                                    <Button variant="outline" onClick={() => {
                                        navigator.clipboard.writeText(apiKey.key)
                                        showNotification({
                                            title: 'Success',
                                            message: 'API key copied to clipboard',
                                            color: 'green',
                                        })
                                    }}>Copy</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Card>
    );
}       