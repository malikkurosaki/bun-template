import { useEffect, useState } from 'react'

import {
    ActionIcon,
    AppShell,
    Avatar,
    Card,
    Flex,
    Group,
    NavLink,
    Paper,
    ScrollArea,
    Stack,
    Text,
    Title,
    Tooltip
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import {
    IconChevronLeft,
    IconChevronRight,
    IconDashboard
} from '@tabler/icons-react'
import type { User } from 'generated/prisma'
import { data, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { default as clientRoute, default as clientRoutes } from '@/clientRoutes'
import apiFetch from '@/lib/apiFetch'
import { showNotification } from '@mantine/notifications'

export default function DashboardLayout() {
  const [opened, setOpened] = useLocalStorage({
    key: 'nav_open',
    defaultValue: true,
  })

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Navbar>
        <AppShell.Section>
          <Group justify="flex-end" p="xs">
            <Tooltip
              label={opened ? 'Collapse navigation' : 'Expand navigation'}
              withArrow
            >
              <ActionIcon
                variant="light"
                color="gray"
                onClick={() => setOpened(v => !v)}
                aria-label="Toggle navigation"
                radius="xl"
              >
                {opened ? <IconChevronLeft /> : <IconChevronRight />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea} flex={1}>
          <NavigationDashboard />
        </AppShell.Section>

        <AppShell.Section>
          <HostView />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack>
          <Paper withBorder shadow="md" radius="lg" p="md">
            <Flex align="center" gap="md">
              {!opened && (
                <Tooltip label="Open navigation menu" withArrow>
                  <ActionIcon
                    variant="light"
                    color="gray"
                    onClick={() => setOpened(true)}
                    aria-label="Open navigation"
                    radius="xl"
                  >
                    <IconChevronRight />
                  </ActionIcon>
                </Tooltip>
              )}
              <Title order={3} fw={600}>
                App Dashboard
              </Title>
            </Flex>
          </Paper>
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

/* ----------------------- Host Info ----------------------- */
function HostView() {
  const [host, setHost] = useState<User | null>(null)

  useEffect(() => {
   async function fetchHost() {
    const {data} = await apiFetch.api.user.find.get()
    setHost(data?.user ?? null)
   }
   fetchHost()
  }, [])

  return (
    <Card radius="lg" withBorder shadow="sm" p="md">
      {host ? (
        <Flex gap="md" align="center">
          <Avatar size="md" radius="xl" color="blue">
            {host.name?.[0]}
          </Avatar>
          <Stack gap={2}>
            <Text fw={600}>{host.name}</Text>
            <Text size="sm" c="dimmed">{host.email}</Text>
          </Stack>
        </Flex>
      ) : (
        <Text size="sm" c="dimmed" ta="center">
          No host information available
        </Text>
      )}
    </Card>
  )
}

/* ----------------------- Navigation ----------------------- */
function NavigationDashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: keyof typeof clientRoute) =>
    location.pathname.startsWith(clientRoute[path])

  return (
    <Stack gap="xs" p="sm">
      <NavLink
        active={isActive('/dashboard/landing')}
        leftSection={<IconDashboard size={20} />}
        label="Dashboard Overview"
        description="Quick summary and activity highlights"
        onClick={() => navigate(clientRoutes['/dashboard/landing'])}
      />
      <NavLink
        active={isActive('/dashboard/apikey')}
        leftSection={<IconDashboard size={20} />}
        label="Dashboard Overview"
        description="Quick summary and activity highlights"
        onClick={() => navigate(clientRoutes['/dashboard/apikey'])}
      />
    </Stack>
  )
}
