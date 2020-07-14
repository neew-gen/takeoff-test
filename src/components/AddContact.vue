<template>
  <mdb-container class="addContact">
    <mdb-row class="addContactRow">
      <mdb-col col="12">
        <mdb-input label="Имя контакта" v-model="contactName"/>
      </mdb-col>
      <mdb-col col="12">
        <mdb-input label="Номер телефона" v-model="contactPhoneNumber"/>
      </mdb-col>
      <mdb-col col="12" class="addContactBtn">
        <mdb-btn color="success" v-on:click="addContact">Создать</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import {
  mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn,
} from 'mdbvue';

export default {
  name: 'AddContact',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn,
  },
  data() {
    return {
      contactName: '',
      contactPhoneNumber: '',
    };
  },
  created() {
    if (this.$store.getters.AUTH_STATUS === false) {
      this.$router.push('/login');
    }
  },
  methods: {
    addContact() {
      this.$store.dispatch('ADD_CONTACT', { contactName: this.contactName, contactPhoneNumber: this.contactPhoneNumber });
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.addContactBtn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
