<template>
  <mdb-container class="login">
    <mdb-row class="loginRow">
      <mdb-col col="12">Пожалуйста, авторизуйтесь:</mdb-col>
      <mdb-col col="6">
        <mdb-input label="Логин" v-model="loginName"/>
      </mdb-col>
      <mdb-col col="6">
        <mdb-input label="Пароль" v-model="loginPassword"/>
      </mdb-col>
      <mdb-col col="12" class="d-flex justify-content-center">
        <mdb-btn color="primary" v-on:click="login">Войти</mdb-btn>
      </mdb-col>
      <mdb-col col="12">Или зарегистрируйтесь:</mdb-col>
      <mdb-col col="6">
        <mdb-input label="Новый логин" v-model="registerName"/>
      </mdb-col>
      <mdb-col col="6">
        <mdb-input label="Новый пароль" v-model="registerPassword"/>
      </mdb-col>
      <mdb-col col="12" class="d-flex justify-content-center">
        <mdb-btn color="success" v-on:click="register">Создать</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import {
  mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn,
} from 'mdbvue';

export default {
  name: 'Login',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
  },
  data() {
    return {
      loginName: '',
      loginPassword: '',
      registerName: '',
      registerPassword: '',
    };
  },
  methods: {
    login() {
      const loginResult = this.$store.getters.SEARCH_USER(this.loginName, this.loginPassword);
      if (loginResult === true) {
        this.$store.dispatch('SET_AUTH', true);
        this.$store.dispatch('SET_CURRENT_USER', this.loginName);
        this.$router.push('/');
      } else {
        const searchNameResult = this.$store.getters.SEARCH_NAME(this.loginName);
        if (searchNameResult === true) {
          alert('Неправильный пароль!');
        } else {
          alert('Пользователь не найден, зарегистрируйтесь!');
        }
      }
    },
    register() {
      const searchNameResult = this.$store.getters.SEARCH_NAME(this.registerName);
      if (searchNameResult !== true) {
        this.$store.dispatch('ADD_USER', {
          userName: this.registerName,
          password: this.registerPassword,
        });
        alert('Регистрация завершена');
        this.$router.push('/');
        this.$store.dispatch('SET_AUTH', true);
        this.$store.dispatch('SET_CURRENT_USER', this.registerName);
      } else {
        alert('Пользователь уже зарегистрирован!');
      }
    },
  },
};
</script>

<style>
</style>
