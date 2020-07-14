/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usersData: [],
    authStatus: false,
    currentUser: '',
  },
  mutations: {
    ADD_USER: (state, { userName, password }) => {
      state.usersData.push({
        userName, password, contactId: 0, contacts: [],
      });
    },
    SET_AUTH: (state, payload) => {
      state.authStatus = payload;
    },
    SET_CURRENT_USER: (state, payload) => {
      state.currentUser = payload;
    },
    ADD_CONTACT: (state, { contactName, contactPhoneNumber }) => {
      state.usersData.filter((item) => {
        if (item.userName === state.currentUser) {
          item.contacts.push({ id: item.contactId, contactName, contactPhoneNumber });
          item.contactId += 1;
        }
      });
    },
    DELETE_CONTACT: (state, id) => {
      state.usersData.filter((item) => {
        if (item.userName === state.currentUser) {
          item.contacts = item.contacts.filter((contact) => contact.id !== id);
        }
      });
    },
    UPDATE_CONTACT: (state, { id, contactName, contactPhoneNumber }) => {
      state.usersData.filter((item) => {
        if (item.userName === state.currentUser) {
          item.contacts.filter((contact) => {
            if (contact.id === id) {
              contact.contactName = contactName;
              contact.contactPhoneNumber = contactPhoneNumber;
            }
          });
        }
      });
    },
  },
  actions: {
    ADD_USER: ({ commit }, { userName, password }) => {
      commit('ADD_USER', { userName, password });
    },
    SET_AUTH: ({ commit }, payload) => {
      commit('SET_AUTH', payload);
    },
    SET_CURRENT_USER: ({ commit }, payload) => {
      commit('SET_CURRENT_USER', payload);
    },
    ADD_CONTACT: ({ commit }, { contactName, contactPhoneNumber }) => {
      commit('ADD_CONTACT', { contactName, contactPhoneNumber });
    },
    DELETE_CONTACT: ({ commit }, id) => {
      commit('DELETE_CONTACT', id);
    },
    UPDATE_CONTACT: ({ commit }, { id, contactName, contactPhoneNumber }) => {
      commit('UPDATE_CONTACT', { id, contactName, contactPhoneNumber });
    },
  },
  getters: {
    SEARCH_USER: (state) => (userName, password) => state.usersData.filter(
      (item) => item.userName === userName && item.password === password,
    ).length === 1,
    SEARCH_NAME: (state) => (userName) => state.usersData.filter(
      (item) => item.userName === userName,
    ).length === 1,
    AUTH_STATUS: (state) => state.authStatus,
    CURRENT_USER: (state) => state.currentUser,
    CONTACTS: (state) => state.usersData.filter(
      (item) => item.userName === state.currentUser,
    )[0].contacts,
  },
  plugins: [createPersistedState()],
});
