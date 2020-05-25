<template>
    <q-layout view="lHh Lpr lFf">
        <header-bar />

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import HeaderBar from 'src/components/HeaderBar.vue'
export default {
    name: 'BareLayout',
    components: {
        HeaderBar,
    },
}
</script>
