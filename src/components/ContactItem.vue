<template>
  <mdb-container>
    <mdb-row>
      <mdb-col col="6" v-if="!editModeStatus">{{this.contact.contactName}}</mdb-col>
      <mdb-col col="6" v-if="editModeStatus">
        <mdb-input label="Изменить имя" v-model="contactNameEdit" />
      </mdb-col>
      <mdb-col col="6" v-if="!editModeStatus">{{this.contact.contactPhoneNumber}}</mdb-col>
      <mdb-col col="6" v-if="editModeStatus">
        <mdb-input label="Изменить номер телефона" v-model="contactPhoneNumberEdit" />
      </mdb-col>
    </mdb-row>
    <mdb-row class="d-flex justify-content-end">
      <mdb-col col="3" v-if="editModeStatus" class="d-flex justify-content-end">
        <mdb-btn color="warning" v-on:click="editModeCancel">Отменить</mdb-btn>
      </mdb-col>
      <mdb-col col="3" v-if="editModeStatus" class="d-flex justify-content-end">
        <mdb-btn color="success" v-on:click="saveChanges">Сохранить</mdb-btn>
      </mdb-col>
      <mdb-col col="3" v-if="!editModeStatus">
        <mdb-btn color="warning" v-on:click="editModeChange">
          Редактировать
        </mdb-btn>
      </mdb-col>
      <mdb-col col="3" v-if="!editModeStatus">
        <mdb-btn color="danger" v-on:click="deleteContact">Удалить</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import {
  mdbContainer, mdbRow, mdbCol, mdbBtn, mdbInput,
} from 'mdbvue';

export default {
  name: 'ContactItem',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput,
  },
  data() {
    return {
      currentId: '',
      editMode: '',
      contactNameEdit: '',
      contactPhoneNumberEdit: '',
    };
  },
  created() {
    this.editMode = -1;
    this.currentId = this.id;
  },
  computed: {
    editModeStatus() {
      return this.editMode === this.currentId;
    },
  },
  methods: {
    deleteContact() {
      this.$store.dispatch('DELETE_CONTACT', this.contact.id);
    },
    editModeChange() {
      this.contactNameEdit = this.contact.contactName;
      this.contactPhoneNumberEdit = this.contact.contactPhoneNumber;
      this.editMode = this.id;
    },
    editModeCancel() {
      this.editMode = -1;
    },
    saveChanges() {
      this.$store.dispatch('UPDATE_CONTACT', { id: this.contact.id, contactName: this.contactNameEdit, contactPhoneNumber: this.contactPhoneNumberEdit });
      this.editMode = -1;
    },
  },
  props: ['contact'],
};
</script>

<style>
</style>
