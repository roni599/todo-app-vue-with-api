<template>
  <input type="text" name="bookName" v-model="bookName" id="">
  <button @click="AddBook" type="button">Add</button>
  <h1>Total Books : {{ $store.getters.totalBook }}</h1>
  <ul>
    <li v-for="(books) in bookList" :key="books.id">{{ books.bookNames }}
      <button @click="changeStatus(books)">{{ books.status }}</button>
      <button @click="deleteBook(books.id)">Delete</button>
      <button @click="updateBook(books)">Update</button>
    </li>
  </ul>
  <hr>
  <h3>Incomplete Todo</h3>
  <ul>
    <li v-for="item in $store.getters.incomplete" :key="item.id">
      {{ item.bookNames }}
    </li>
  </ul>

  <h3>Complete Todo</h3>
  <ul>
    <li v-for="item in $store.getters.completeTodo" :key="item.id">
      {{ item.bookNames }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      bookName: '',
      status: '',
      bookIndex: null
    }
  },
  computed: {
    bookList() {
      return this.$store.state.bookList
    },
  },
  methods: {
    AddBook() {
      if (this.bookIndex !== null) {
        this.$store.dispatch('updateBook', {
          bookNames: this.bookName,
          status: this.status,
          id: this.bookIndex
        })
        this.bookIndex = null;
      }
      else {
        this.$store.dispatch('AddBook', {
          bookNames: this.bookName,
          status: 'todo'
        })
      }
      this.bookName = ''
    },
    changeStatus(books) {
      if (books.status === 'todo') {
        books.status = 'complete';
      }
      else {
        books.status = 'todo'
      }
      this.$store.dispatch('changeStatus', books)
    },
    deleteBook(booksId) {
      this.$store.dispatch('deleteBook', booksId);
    },
    updateBook(books) {
      this.bookName = books.bookNames,
        this.status = books.status
      this.bookIndex = books.id
    }
  },
  mounted() {
    this.$store.dispatch('getTodo')
  }

}
</script>

<style></style>