<template>
  <div class="userPanel">
    <div>Вы вошли как {{this.currentUser}}</div>
    <div><mdb-btn color="default" v-on:click="logout">Выйти</mdb-btn></div>
  </div>
</template>

<script>
import { mdbBtn } from 'mdbvue';

export default {
  name: 'UserPanel',
  components: {
    mdbBtn,
  },
  computed: {
    currentUser() {
      return this.$store.getters.CURRENT_USER;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('SET_AUTH', false);
      this.$store.dispatch('SET_CURRENT_USER', '');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.userPanel {
  height: 100%;
  width: 400px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
