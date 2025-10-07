
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

import { MantineProvider } from '@mantine/core';
import AppRoutes from './AppRoutes';

export function App() {
  return <MantineProvider>
    <Notifications />
    <AppRoutes />
  </MantineProvider>;
}

