<template>
  <mdb-container>
    <mdb-row>
      <mdb-col>
        <ul v-if="auth_status">
          <li v-for="(contact) in contacts" :key="contact.id">
            <ContactItem v-bind:contact="contact"/>
          </li>
        </ul>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';

import ContactItem from '@/components/ContactItem.vue';

export default {
  name: 'Home',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    ContactItem,
  },
  created() {
    if (this.$store.getters.AUTH_STATUS === false) {
      this.$router.push('/login');
    }
  },
  computed: {
    contacts() {
      return this.$store.getters.CONTACTS;
    },
    auth_status() {
      return this.$store.getters.AUTH_STATUS;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
