import { apolloClient } from '../../apollo';
import { QUERIES, MUTATIONS } from '../../apollo/schemas/user';

const state = {
  users: [],
  selectedUser: null,
};

const mutations = {
  fetchUsers(state, users) {
    state.users = users;
  },
  fetchUser(state, user) {
    state.user = user;
  },
  disableUser(state, { user, reason = user.disabledReason }) {
    user.disabled = true;
    user.disabledReason = reason;
  },
  enableUser(state, { user }) {
    user.disabled = false;
    user.disabledReason = null;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    const { data } = await apolloClient.query({ query: QUERIES.USERS() });
    commit('fetchUsers', data.readersList);
  },
  // async fetchTodos({ commit }) {
  //   const { data } = await commit('fetchTodos', data.todos);
  // },
  // async removeTodo({ commit }, todo) {
  //   const { data } = await apolloClient.mutate({
  //     mutation: todoDeleteMutation,
  //     variables: { todoId: todo.id },
  //   });
  //   if (data.delete_todos.affected_rows) {
  //     commit('removeTodo', todo);
  //   }
  // },
  // async toggleTodo({ commit }, todo) {
  //   const { data } = await apolloClient.mutate({
  //     mutation: todoUpdateMutation,
  //     variables: { todoId: todo.id, done: !todo.is_completed },
  //   });
  //   if (data.update_todos.affected_rows) {
  //     commit('editTodo', { todo, done: !todo.is_completed });
  //   }
  // },
  // editTodo({ commit }, { todo, value }) {
  //   commit('editTodo', { todo, text: value });
  // },
  // async toggleAll({ state, commit }, done) {
  //   const { data } = await apolloClient.mutate({
  //     mutation: todoUpdateToggleAllMutation,
  //     variables: { done: done },
  //   });
  //   if (data.update_todos.affected_rows) {
  //     state.todos.forEach(todo => {
  //       commit('editTodo', { todo, done });
  //     });
  //   }
  // },
  // async clearCompleted({ state, commit }) {
  //   const { data } = await apolloClient.mutate({
  //     mutation: todoDeleteCompletedMutation,
  //   });
  //   if (data.delete_todos.affected_rows) {
  //     state.todos
  //       .filter(todo => todo.is_completed)
  //       .forEach(todo => {
  //         commit('removeTodo', todo);
  //       });
  //   }
  // },
};

export default {
  state,
  mutations,
  actions,
};
