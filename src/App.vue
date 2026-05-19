<template>
  <!-- Unauthenticated states: brand splash background uses the dashboard's
       cyan-to-violet gradient instead of solid Material purple. -->
  <v-app v-if="!isLoggedIn" class="iot-splash">
    <Login title="Management Console"></Login>
  </v-app>
  <v-app v-else-if="cloudLoginRedirect" class="iot-splash">
    <CloudLogin></CloudLogin>
  </v-app>
  <v-app v-else-if="route.name === 'Launcher'">
    <Launcher></Launcher>
  </v-app>
  <v-app v-else :class="{ 'iot-app--embedded': isEmbedded }">
    <!-- Chrome (AppBar + Drawer) is suppressed in embed mode so the IoT
         Dashboard's outer chrome is the only one visible. -->
    <AppBar v-if="!isEmbedded" v-model="drawer"></AppBar>
    <Drawer v-if="!isEmbedded" v-model="drawer"></Drawer>
    <v-main class="iot-main">
      <router-view v-slot="{ Component }" style="width: 100%; height: 100%;">
        <component :is="Component" />
      </router-view>
      <v-snackbar color="warning" :model-value="!connectedClient" :timeout="-1" close-on-content-click>
        <div style="display: flex; justify-content: center;">
          <div class="mr-4">
            <v-icon size="small">{{ getFaPrefix('fa-wifi-slash') }}</v-icon>
          </div>
          <div style="margin-top: 2px;" class="mr-6">Disconnected</div>
        </div>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import * as packageJson from '../package.json';
import { ref } from 'vue';
import { clientAppVersion, cloudLoginRedirect, connectedClient, connectPluginClient, isAppDomain, isLoggedIn, setAppDomain, setClientAppVersion, setClientConnectionPreferences, setClientPluginId } from './common/client';
import CloudLogin from './common/components/CloudLogin.vue';
import Login from './common/components/Login.vue';
import { isTouchDevice } from './common/size';
import { getThemeManager } from "./common/theme";
import AppBar from './components/AppBar.vue';
import Drawer from './components/Drawer.vue';
import { useRoute } from 'vue-router';
import Launcher from './components/Launcher.vue';
import { getFaPrefix } from './util/device-icons';
import { useEmbedMode } from './composables/useEmbedMode';

const route = useRoute();

const drawer = ref(!isTouchDevice.value);
getThemeManager().updateTheme();

const { isEmbedded } = useEmbedMode();

setClientAppVersion(packageJson.version);
console.log('management ui version', clientAppVersion);
setClientPluginId('@scrypted/core');
setAppDomain('manage.scrypted.app', false);
setClientConnectionPreferences({
  webrtc: false,
});

if (!isAppDomain()) {
  // unregister any service workers if not running from manage.scrypted.app
  // todo: remove, this as it is handled by npm run build now.
  navigator.serviceWorker?.getRegistration().then(registration => {
    if (registration) {
      console.warn('unregistering service worker', registration);
      registration.unregister();
    }
  });
}

connectPluginClient();

//
</script>
<style>
html {
  font-size: 14px !important;
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

/* Login / CloudLogin background uses the IoT Dashboard gradient
   instead of solid Material purple. */
.iot-splash {
  background:
    radial-gradient(ellipse at 30% 20%, rgba(34, 211, 238, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.18) 0%, transparent 50%),
    linear-gradient(135deg, #0f172a 0%, #020617 100%);
}
.iot-splash .v-application__wrap {
  background: transparent;
}

/* Embed-mode tightening — no chrome means main content should
   reach edge-to-edge with no drawer offset. */
.iot-app--embedded :deep(.v-main) {
  --v-layout-left: 0px !important;
  --v-layout-right: 0px !important;
  --v-layout-top: 0px !important;
  --v-layout-bottom: 0px !important;
  padding: 0 !important;
}

/* Main content area always fills its viewport area
   (Scrypted upstream sometimes leaves huge empty space when content
   is narrow — same flex-shrink issue we fixed in mediamtx-ui). */
.iot-main {
  min-height: 100vh;
}
.iot-main :deep(.v-main__wrap) {
  display: flex;
  flex-direction: column;
}
</style>
