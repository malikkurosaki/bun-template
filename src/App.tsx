
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from '@mantine/core';
import AppRoutes from './AppRoutes';

export function App() {
  return <MantineProvider>
    <Notifications />
    <ModalsProvider>
      <AppRoutes />
    </ModalsProvider>
  </MantineProvider>;
}

