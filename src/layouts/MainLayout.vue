<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <NavbarLong/>
    </q-header>

    

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal>
      <FooterLong/>
    </q-footer>
  
  </q-layout>
</template>

<script>
// Vue
import { defineComponent } from 'vue'

// Components
import NavbarLong from '../components/layout/NavbarLong.vue'
import FooterLong from '../components/layout/FooterLong.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavbarLong,
    FooterLong
  }
})
</script>
