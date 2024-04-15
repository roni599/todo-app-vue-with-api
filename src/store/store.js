import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
    state: {
        bookList: []
    },
    getters: {
        totalBook(state) {
            return state.bookList.length
        },
        incomplete(state) {
            return state.bookList.filter((item) => {
                return item.status === 'todo'
            })
        },
        completeTodo(state) {
            return state.bookList.filter((item) => {
                return item.status === 'complete'
            })
        }
    },
    mutations: {
        GET_TODO(state, data) {
            state.bookList = data
        },
        CHANGE_STATUS(state, data) {
            const currentIndex = state.bookList.findIndex((item) => {
                return item.id === data.id
            })
            state.bookList[currentIndex] = data;
        },
        UPDATE_BOOKS(state, data) {
            const currentIndex = state.bookList.findIndex((item) => {
                return item.id === data.id
            })
            state.bookList[currentIndex] = data
        }
    }
    ,
    actions: {
        async AddBook({ dispatch }, data) {
            await axios.post(`http://localhost:3000/books`, data)
            await dispatch('getTodo')
        },
        async getTodo({ commit }) {
            await axios.get(`http://localhost:3000/books`)
                .then(res => {
                    commit('GET_TODO', res.data)
                })
        },
        async changeStatus({ commit }, books) {
            await axios.put(`http://localhost:3000/books/${books.id}`, books)
                .then(res => {
                    commit('CHANGE_STATUS', res.data)
                })
        },
        async deleteBook({ dispatch }, booksId) {
            await axios.delete(`http://localhost:3000/books/${booksId}`)
            await dispatch('getTodo')
        },
        async updateBook({ commit, dispatch }, data) {
            await axios.put(`http://localhost:3000/books/${data.id}`, data)
                .then(res => {
                    commit('UPDATE_BOOKS', res.data)
                })

        }

    }
})

export default store;