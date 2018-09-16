<template>
  <div class="Books">
    <b-navbar
      toggleable="md"
      type="dark"
      variant="dark"
    >
      <div class="container">
        <b-navbar-toggle target="nav_collapse"/>
        <b-navbar-brand href="#">Basma Bookstore</b-navbar-brand>
        <b-collapse
          id="nav_collapse"
          is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/">Home</b-nav-item>
            <b-nav-item
              href="#"
              class="active">Books</b-nav-item>
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                user_123
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <!-- end navbar section -->
    <div class="container">
      <div class="row">
        <div class="col-sm-9">
          <div class="row sub-title">
            <div class="col-sm-9">
              <h2>Books List</h2>
            </div>
            <div class="col-sm-3">
              <span class="book-length"> of {{ Books.length }} Books </span>
            </div>
          </div>
        </div>
      </div>
      <!-- end main title -->
      <div class="row">
        <div class="col-sm-9">
          <ul class="list-unstyled">
            <b-media
              v-for="book in pagedBooks"
              :key="book.index"
              tag="li"
              class="media">
              <b-img
                slot="aside"
                :src="book.url"
                vertical-align="center"
                alt=""
                width="200"
                height="250" />
              <h4 class="mt-0 mb-1">{{ book.title }}</h4>
              <p>
                <strong>{{ book.author }}</strong>
              </p>
              <p class="book-description">
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                Donec lacinia conguefelis in faucibus.
              </p>
              <div class="footer">
                <button
                  class="btn btn-primary"
                  @click="showBookModal()">View Book</button>
                <button
                  class="btn btn-danger"
                  @click="deleteBook(index)">Delete</button>
                <span class="price">{{ book.price }}</span>
              </div>
            </b-media>
          </ul>
          <!-- start pagination -->
          <pagination
            :list-data = "Books"
            @next = "nextPage"
            @prev = "prevPage"
            @page-changed="pageOneChanged"
          />
        </div>
        <!-- list of Books -->
        <div class="col-sm-3">
          <div class="search-btn">
            <div class="sort-btn">
              <label for="input-none">Sort:</label>
              <b-button
                v-if="sortType='asc' "
                class="secondary"
                @click="toggle()">Asc / Desc</b-button>
            </div>
            <b-form-input
              v-model="search"
              class="form-control"
              type="text"
              placeholder="Search book..." />
          </div>
          <b-list-group>
            <b-list-group-item
              button
              disabled>User Panel</b-list-group-item>
            <b-list-group-item
              button
              @click="showModal">Add book</b-list-group-item>
            <b-list-group-item button>Add Author</b-list-group-item>
            <b-list-group-item button>View Members</b-list-group-item>
          </b-list-group>
          <b-list-group class="panel">
            <b-list-group-item
              button
              disabled>Admin Panel</b-list-group-item>
            <b-list-group-item button>View Jobs</b-list-group-item>
            <b-list-group-item button>View Branches</b-list-group-item>
            <b-list-group-item button>View Users</b-list-group-item>
          </b-list-group>
        </div>
        <!-- end sidebar section and panels-->
      </div>

      <!-- modal - add book -->
      <b-modal
        ref="myModalRef"
        hide-footer
        title="Add new book">
        <div class="d-block">
          <form @submit.prevent="addBook">
            <div class="form-group">
              <label>Title: </label>
              <input
                v-model="newBook.title"
                class="form-control"
                type="text"
                placeholder="Enter the title"
                required
                autofocus>
            </div>
            <div class="form-group">
              <label>Author: </label>
              <input
                v-model="newBook.author"
                class="form-control"
                type="text"
                placeholder="Enter the author"
                required>
            </div>
            <div class="form-group">
              <label>Price: </label>
              <input
                v-model="newBook.price"
                class="form-control"
                type="text"
                placeholder="Enter the price"
                required>
            </div>
            <div class="form-group">
              <input
                type="file"
                accept="image/*"
                @change="previewFiles">
            </div>
            <button
              class="btn btn-dark form-control"
              @click="hideModal()">Submit</button>
          </form>
        </div>
      </b-modal>

      <!-- view book modal -->
      <b-modal
        ref="myBookModalRef"
        hide-footer
        title="About the book">
        <div class="d-block"/>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Pagination from './Ui/pagination';

export default {
  name: 'Books',
  components: {
    Pagination,
  },
  data() {
    return {
      newBook: [],
      search: '',
      isSort: false,
      sorting: -1,
      sortType: 'default',
      pagedBooks: [],
      totalPages: 3,
      Books: [
        {
          url:
            'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9780743273565/the-great-gatsby-9780743273565_hr.jpg',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          price: '$54.99',
        },
        {
          url:
            'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-grapes-of-wrath-spec-cover-harold-shull.jpg',
          title: 'The Grapes of Wrath',
          author: 'John Steinbeck',
          price: '$39.60',
        },
        {
          url: 'https://pbs.twimg.com/media/DPP-tigX4AA472i.jpg',
          title: 'Nineteen Eighty-Four',
          author: 'George Orwell',
          price: '$12.00',
        },
        {
          url:
            'https://www.hodder.co.uk/assets/HodderStoughton/img/book/395/isbn9781444730395.jpg',
          title: 'The Good Father',
          author: 'Noah Hawley',
          price: '$50.00',
        },
        {
          url:
            'https://www.hodder.co.uk/assets/HodderStoughton/img/book/395/isbn9781444730395.jpg',
          title: 'The Good Father',
          author: 'Noah Hawley',
          price: '$50.00',
        },
        {
          url:
            'https://www.hodder.co.uk/assets/HodderStoughton/img/book/395/isbn9781444730395.jpg',
          title: 'The Good Father',
          author: 'Noah Hawley',
          price: '$50.00',
        },
      ],
    };
  },
  computed: {
    filteredBooks() {
      return this.Books.filter(book => book.title.toLowerCase()
        .includes(this.search.toLowerCase()));
    },
    // pageBooks() {
    //   return this.Books.slice(0, 2);
    // },
  },
  methods: {
    addBook(e) {
      this.Books.push({
        url: this.newBook.url,
        title: this.newBook.title,
        author: this.newBook.author,
        price: this.newBook.price,
      });
      e.preventDefault();
      this.newBook = '';
    },
    deleteBook(index) {
      this.splice(index, 1);
    },
    nextPage(e) {
      this.pagedBooks = e.books;
    },
    prevPage(e) {
      this.pagedBooks = e.books;
    },
    pageOneChanged(e) {
      this.pagedBooks = e.books;
    },
    previewFiles(e) {
      // initiate
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        // upload and read image path
        this.newBook.url = readerEvent.target.result;
      };
      // read data contains url
      reader.readAsDataURL(e.target.files[0]);
    },
    toggle() {
      if (this.isSort) {
        return this.Books.slice(0)
          .sort((a, b) => (a.title < b.title ? this.sorting : -this.sorting));
      }
      return this.Books;
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    showBookModal() {
      this.$refs.myBookModalRef.show();
    },
  },
};
</script>
