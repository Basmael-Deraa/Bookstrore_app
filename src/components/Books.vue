<template>
    <div class="books">
      <div class="container">

        <h1>Books List</h1>
        <div class="row">
            <div class="col-sm-9">
               <input class="form-control" type="text" v-model="search" placeholder="Search book...">
            </div>
            <div class="col-sm-3 form-group">
               <label class="">Sort:</label>
               <button class="btn btn-dark" @click="toggle()">Asc/Desc</button>
            </div>
        </div>
        <!-- list of books -->
        <b-card-group deck>
            <b-card v-for="book in filteredBooks">
              <img :src="book.url" alt="">
              <h4>{{book.title}}</h4>
              <p><strong>{{book.author}}</strong></p>
              <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <b-button v-bind:href="book.link" target="_blank" variant="primary">View Book</b-button>
              <span class="price">{{book.price}}</span>
            </b-card>
         </b-card-group>

        <!-- modal -->
        <div class="btns" v-show="is_admin">
          <b-button @click="showModal">Add book</b-button>
          <button class="btn btn-danger" v-on:click="deleteBook(book)">Delete Book</button>
        </div>
        <b-modal ref="myModalRef" hide-footer title="Add new book">
          <div class="d-block">
            <form>
              <div class="form-group">
              <label>Title: </label>
              <input class="form-control" type="text" v-model="newBook.title" placeholder="Enter the title" required autofocus>
            </div>
            <div class="form-group">
              <label>Author: </label>
              <input class="form-control" type="text" v-model="newBook.author" placeholder="Enter the author" required>
            </div>
            <div class="form-group">
              <label>Price: </label>
              <input class="form-control" type="text" v-model="newBook.price" placeholder="Enter the price" required>
            </div>
            <div class="form-group">
              <input
              style="display:none"
              type="file"
              @change="onFileSelected"
              ref="fileInput"
              accept="image/*">
              <button class="btn btn-primary" @click="$refs.fileInput.click()">Choose file</button>
              <div  v-if="imageURL.length > 0">
                <img class="preview" :src="imageURL">
              </div>
            </div>
              <button class="btn btn-dark form-control add-book" @click="addBook">Submit</button>
            </form>
          </div>
        </b-modal>

      </div>
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
                sortType: 'default',
                selectedFile: null,
                is_admin: true,
                imageURL: '',
                books: [
                  {
                      url: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9780743273565/the-great-gatsby-9780743273565_hr.jpg',
                      title: 'The Great Gatsby',
                      author: 'F. Scott Fitzgerald',
                      price: '$54.99'
                  },
                  {
                      url: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-grapes-of-wrath-spec-cover-harold-shull.jpg',
                      title: 'The Grapes of Wrath',
                      author: 'John Steinbeck',
                      price: '$39.60'
                  },
                  {
                      url: 'https://pbs.twimg.com/media/DPP-tigX4AA472i.jpg',
                      title: 'Nineteen Eighty-Four',
                      author: 'George Orwell',
                      price: '$12.00'
                  },
                  {
                      url: 'https://www.hodder.co.uk/assets/HodderStoughton/img/book/395/isbn9781444730395.jpg',
                      title: 'The Good Father',
                      author: 'Noah Hawley',
                      price: '$50.00'
                  },
                ]
            }
        },
        methods: {
          addBook: function(e) {
            this.books.push({
              url: this.newBook.url,
              title: this.newBook.title,
              author: this.newBook.author,
              price: this.newBook.price,
            });
            e.preventDefault();
            this.newBook = ""
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
              this.sortType = 'asc';
              return this.books.sort(compare);
            }
            function compare(a, b) {
              if (a.title < b.title)
                return 1;
              if (a.title > b.title)
                return -1;
              return 0;
            }
            this.sortType = 'desc';
            return this.books.sort(compare);
          },
          showModal () {
             this.$refs.myModalRef.show()
          },
          onFileSelected(event) {
            var input = event.target;
            if (input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageURL = e.target.result;
                }
                this.book.url = reader.readAsDataURL(input.files[0]);
            }
          }
        },
        computed: {
          filteredBooks: function() {
            return this.books.filter((book) => {
              return book.title.toLowerCase().includes(this.search.toLowerCase())
            });
          }
        }
      }
</script>

<style scoped>
</style>
