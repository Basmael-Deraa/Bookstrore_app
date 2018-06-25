<template>
    <div class="books">
       <h1>Books List</h1>
       <input type="text" v-model="search" placeholder="Search...">
       <br />
       <label>Sort:</label>
       <button @click="toggle()">Asc/Desc</button>
       <!-- <span v-if="sortType='asc' " @click="toggle()">&lt;</span>
       <span v-if="sortType='desc' " @click="toggle()">&gt;</span> -->
       <br/>
       <table>
          <thead>
              <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="book in filteredBooks">
                  <td> <button v-on:click="deleteBook(book)">×</button> {{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.price }}</td>
              </tr>
          </tbody>
        </table>
        <br />
        <form v-on:submit="addBook">
          <label>Title: </label>
          <input type="text" v-model="newBook.title" placeholder="Enter the title">
          <br />
          <label>Author: </label>
          <input type="text" v-model="newBook.author" placeholder="Enter the author">
          <br />
          <label>Price: </label>
          <input type="text" v-model="newBook.price" placeholder="Enter the price">
          <br />
          <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
    export default {
        name: 'books',
        data() {
            return {
                newBook: {},
                search: '',
                isSort: false,
                // sortType: {
                //   state:'initial',
                //   stateOne: 'asc',
                //   stateTwo: 'desc'
                // },
                books: [
                  {
                      title: 'The Great Gatsby',
                      author: 'F. Scott Fitzgerald',
                      price: '$54.99'
                  },
                  {
                      title: 'The Grapes of Wrath',
                      author: 'John Steinbeck',
                      price: '$39.60'
                  },
                  {
                      title: 'Nineteen Eighty-Four',
                      author: 'George Orwell',
                      price: '$102.00'
                  },
                  {
                      title: 'Eighty-Four',
                      author: 'George Orwell',
                      price: '$102.00'
                  },
                  {
                      title: 'Good Father',
                      author: 'George Orwell',
                      price: '$50.00'
                  },
                ]
            }
        },
        methods: {
          addBook: function(e) {
            this.books.push({
              title: this.newBook.title,
              author: this.newBook.author,
              price: this.newBook.price
            });
            e.preventDefault();
          },
          deleteBook: function(book) {
            this.books.splice(this.books.indexOf(book), 1);
          },
          toggle: function() {
            if(this.isSort = !this.isSort) {
              function compare(a, b) {
                if (a.title < b.title)
                  return -1;
                if (a.title > b.title)
                  return 1;
                return 0;
              }
              return this.books.sort(compare);
            }
            function compare(a, b) {
              if (a.title < b.title)
                return 1;
              if (a.title > b.title)
                return -1;
              return 0;
            }
            return this.books.sort(compare);
            }
        },
        computed: {
          filteredBooks: function() {
            return this.books.filter((book) => {
              return book.title.match(this.search)
                  || book.author.match(this.search)
                  || book.price.match(this.search)
            });
          }
        }
      }
</script>

<style scoped>
</style>
