<template>
  <mdb-container class="header">
    <mdb-row class="headerRow">
      <mdb-col col="4" class="headerTitle"><h1>takeoff-test</h1></mdb-col>
      <mdb-col col="4" class="headerContactsBtn" v-if="authStatus">
        <router-link to="/add" >Добавить контакт</router-link>
      </mdb-col>
      <mdb-col col="4" class="headerMenu" v-if="authStatus"><UserPanel /></mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue';
import UserPanel from '@/components/UserPanel.vue';

export default {
  name: 'Header',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    UserPanel,
  },
  computed: {
    authStatus() {
      return this.$store.getters.AUTH_STATUS;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 120px;
  .headerRow {
    width: 100%;
    height: 100%;
    .headerTitle, .headerContactsBtn, .headerMenu {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .headerTitle {
      margin-right: auto;
    }
    .headerContactsBtn {
      justify-content: flex-end;
    }
  }
}
</style>
