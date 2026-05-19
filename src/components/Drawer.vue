<template>
  <v-navigation-drawer @update:model-value="emits('update:modelValue', $event)" :model-value="modelValue" app clipped
    fixed :permanent="!isTouchDevice" width="240" class="iot-drawer" color="surface">
    <v-list density="comfortable" nav class="iot-drawer-list">
      <template v-for="(itemGroup, index) of itemGroups" :key="itemGroup.title || index">
        <v-list-subheader v-if="itemGroup.title" class="iot-drawer-subheader">{{ itemGroup.title }}</v-list-subheader>
        <v-list-item v-for="item of itemGroup.items" link :href="item.href" :target="item.target" :to="item.to"
          @click="item.click" :active="item.active?.()" :title="item.title" class="iot-drawer-item"
          active-color="primary">
          <template v-slot:prepend>
            <template v-if="item.badge">
              <v-badge color="error" :content="!item.badgeIcon && item.badge" :icon="item.badgeIcon && item.badge">
                <v-icon size="small">{{ item.icon }}</v-icon>
              </v-badge>
            </template>
            <v-icon v-else size="small">{{ item.icon }}</v-icon>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-dialog v-model="showAlerts" v-if="currentAlert" location="center" max-width="400">
    <v-card color="error" :prepend-icon="alertIcon">
      <template v-slot:title>
        <v-card-title>{{ currentAlert.title }}</v-card-title>
      </template>
      <template v-slot:append>
        <v-btn variant="text" :disabled="!alertIndex" @click="alertIndex--"
          :icon="getFaPrefix('fa-arrow-left')"></v-btn>
        <v-btn variant="text" :disabled="alertIndex >= scryptedAlerts.length - 1" @click="alertIndex++"
          :icon="getFaPrefix('fa-arrow-right')"></v-btn>
      </template>
      <v-card-text>{{ currentAlert.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="removeAlert(currentAlert)">Dismiss</v-btn>
        <v-btn :to="alertDeviceId ? getDeviceRoute(alertDeviceId) : undefined" @click="showAlerts = false">View</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { connectedClient, isAdmin } from '@/common/client';
import { isTouchDevice } from '@/common/size';
import { getFaPrefix, typeToIcon } from '@/util/device-icons';
import { getDeviceRoute } from '@/util/id-device';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { removeAlert, scryptedAlerts } from '../util/internal-apis';
import { getPluginMonitors, getServerUpdateMonitor } from '@/util/npm';

defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const route = useRoute();

const routeName = computed(() => {
  return route.name;
});

const alertIndex = ref(0);
const showAlerts = ref(false);
watch(() => showAlerts.value, () => alertIndex.value = 0);

const currentAlert = computed(() => {
  return scryptedAlerts.value[alertIndex.value];
});

// dismissing the alert will remove the dialog before unsetting showAlerts.
watch(() => currentAlert.value, () => {
  if (!currentAlert.value)
    showAlerts.value = false;
});

const alertDeviceId = computed(() => {
  const d = '/device/';
  if (!currentAlert.value?.path.startsWith(d))
    return;
  const id = currentAlert.value.path.substring(d.length);
  return id;
});

const alertIcon = computed(() => {
  if (!alertDeviceId.value)
    return;
  const device = connectedClient?.value.systemManager.getDeviceById(alertDeviceId.value);
  if (!device)
    return;
  return typeToIcon(device.type);
});

interface ItemGroup {
  title: string | undefined;
  items: {
    title: string;
    icon: string;
    href?: string;
    to?: string;
    target?: string;
    badge?: string;
    badgeIcon?: boolean;
    click?: () => void;
    active?: () => boolean;
  }[];
}

const { pluginUpdateCount } = getPluginMonitors();
const updateAvailable = getServerUpdateMonitor();

const itemGroups = computed(() => {
  const itemGroups: ItemGroup[] = [
    {
      title: undefined,
      items: [
        { title: 'Devices', icon: getFaPrefix('fa-house-signal'), to: '/device', active: () => routeName.value === 'Device' || routeName.value === 'DeviceList' },
        ...(!isAdmin.value ? [] : pluginUpdateCount.value
          ? [{ title: 'Plugins', icon: getFaPrefix('fa-puzzle'), to: '/component/plugin', badge: pluginUpdateCount.value.toString() }]
          : [{ title: 'Plugins', icon: getFaPrefix('fa-puzzle'), to: '/component/plugin' }]
        )
      ]
    },
    {
      title: 'Utilities',
      items: [
        ...(isAdmin.value ? [
          { title: 'Users', icon: getFaPrefix('fa-users'), to: '/users' },
          { title: 'Automations', icon: getFaPrefix('fa-bolt'), to: '/automations' },
          { title: 'Scripts', icon: getFaPrefix('fa-code'), to: '/scripts' },
          { title: 'Terminal', icon: getFaPrefix('fa-rectangle-terminal'), to: '/component/shell' },
        ] : []),
        ...(scryptedAlerts.value.length
          ? [
            {
              title: 'Alerts',
              icon: getFaPrefix('fa-message-exclamation'),
              click: () => {
                showAlerts.value = true;
              },
              badge: scryptedAlerts.value.length.toString()
            }
          ]
          : []),
        ...(isAdmin.value ? [
          {
            title: 'Settings',
            icon: getFaPrefix('fa-gear'),
            to: '/settings',
            badge: updateAvailable.value?.updateAvailable ? getFaPrefix('fa-download') : undefined,
            badgeIcon: true,
          },
        ] : [])
      ]
    },
    {
      title: 'Community',
      items: [
        { title: 'Documentation', icon: getFaPrefix('fa-book'), href: 'https://docs.scrypted.app', target: "_blank" },
        { title: 'Discord', icon: 'fa-brands fa-discord', href: 'https://discord.gg/DcFzmBHYGq', target: '_blank' },
        { title: 'Reddit', icon: 'fa-brands fa-reddit-alien', href: 'https://www.reddit.com/r/Scrypted', target: '_blank' },
      ]
    },
  ];
  return itemGroups;
})
</script>

<style scoped>
/* IoT Dashboard signature look on the side nav. */
.iot-drawer {
  border-right: 1px solid rgba(34, 211, 238, 0.10);
}
.iot-drawer-subheader {
  font-size: 10px !important;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.7) !important;
  padding-top: 14px !important;
  padding-bottom: 4px !important;
  min-height: auto !important;
}
.iot-drawer-list {
  padding: 8px 10px;
}
.iot-drawer-item {
  border-radius: 10px !important;
  margin-bottom: 2px;
  min-height: 40px !important;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.iot-drawer-item :deep(.v-list-item__prepend) {
  width: 28px;
}
.iot-drawer-item :deep(.v-list-item-title) {
  font-size: 13px;
  font-weight: 500;
}
.iot-drawer-item:hover {
  background-color: rgba(34, 211, 238, 0.06) !important;
}
.iot-drawer-item.v-list-item--active {
  background: linear-gradient(90deg, rgba(34, 211, 238, 0.14), rgba(34, 211, 238, 0.04)) !important;
  color: #22d3ee !important;
  box-shadow: inset 3px 0 0 #22d3ee;
}
.iot-drawer-item.v-list-item--active :deep(.v-icon) {
  color: #22d3ee !important;
}
</style>
