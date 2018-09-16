<template>
  <div>
    <ul class="pagination list-unstyled">
      <li>
        <button
          :disabled="isInFirstPage"
          @click="prevPage">
          &laquo;
        </button>
      </li>
      <li
        v-for="page in pageCount"
      >
        <button
          :class="activePage(page)"
          @click.prevent="pageChanged(page)">{{ page }}
        </button>
      </li>
      <li>
        <button
          :disabled="isInLastPage"
          href="#"
          @click="nextPage">&raquo;</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // total number of books
    listData: {
      type: Array,
      required: true,
    },
    // books per page
    size: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  data() {
    return {
      pageNumber: 0, // default to page 0
    };
  },
  computed: {
    pageCount() {
      const l = this.listData.length;
      const s = this.size;
      return Math.floor(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.listData.slice(start, end);
    },
    isInFirstPage() {
      return this.pageNumber === 0;
    },
    isInLastPage() {
      return this.pageNumber === this.paginatedData.length;
    },
  },
  methods: {
    nextPage() {
      this.pageNumber += 1;
      this.$emit('next', { books: this.paginatedData });
    },
    prevPage() {
      this.pageNumber -= 1;
      this.$emit('prev', { books: this.paginatedData });
    },
    pageChanged() {
      this.$emit('page-changed', { books: this.paginatedData });
    },
    activePage(pageNum) {
      return this.pageNumber === pageNum ? 'active' : '';
    },
  },
};
</script>

<style>
.pagination li {
  border-radius: 4px;
  margin-right: 3px;
  background: #fff;
  padding: 5px 10px;
  box-shadow: 0px 3px 9px #ccc;
}
.pagination button {
  background: none;
  border: 0px;
  outline: 0;
  cursor: pointer;
  padding: 5px;
}
.pagination li button:disabled {cursor: unset;
}
.pagination li {color: #7e7e7e !important}
.pagination li:hover {
  background: #ededed
}
</style>
