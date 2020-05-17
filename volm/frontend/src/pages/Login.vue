<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >

    Login page

    <q-btn
      label="Login"
      @click="login()"
    />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      1: 1,
    }
  },
  methods: {
    login () {
      this
        .$http
        .post(process.env.API)
        .catch(ERROR => console.error('login()', ERROR))
    },
  },
}
</script>
