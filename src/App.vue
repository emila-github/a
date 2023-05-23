<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <transition name="page-transition">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition> -->
    <router-view />
    <!-- <div class="footer">Copyright © 2020  ({{ version }})</div> -->
  </div>
</template>
<script>
import config from '../package.json'
export default {
  data() {
    return {
      version: 'V' + config.version,
    }
  },

  computed: {
    // keepAlive() {
    //   console.log('this.$route.meta.keepAlive', this.$route.meta.keepAlive)
    //   return this.$route.meta.keepAlive
    // },
  },
  methods: {},
}
</script>
<style lang="scss">
body {
  font-size: 80px;
  background-color: #f8f8f8 !important;
  -webkit-font-smoothing: antialiased;
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    color: #989899;
    padding: 10px;
    // margin-bottom: 60px;
  }
}
a {
  color: #e93104;
}

.mobile-ant-table {
  :root .ant-table-thead > tr > th .ant-table-column-sorter,
  :root .ant-table-thead > tr > th .ant-table-column-sorter-full,
  :root .ant-table-thead > tr > th .ant-table-column-sorter-inner,
  :root .ant-table-thead > tr > th .ant-table-column-sorter-up,
  :root .ant-table-thead > tr > th .ant-table-column-sorter-down,
  :root .ant-table-thead > tr > th .ant-table-column-sorter,
  .ant-table-column-sorter-full,
  .ant-table-column-sorter-up,
  .ant-table-column-sorter-inner,
  .ant-table-column-sorter-down {
    font-size: 24px;
    height: 2em;
    line-height: 1em;
    margin-left: 0.1em;
  }
  .ant-table-thead
    > tr
    > th
    .ant-table-column-sorter
    .ant-table-column-sorter-inner-full
    .ant-table-column-sorter-down {
    margin-top: 0.5em;
  }
  svg {
    width: 1.3em;
    height: 1.3em;
    fill: currentcolor;
  }
  .ant-table-thead > tr > th {
    font-size: 22px;
    font-weight: normal;
    color: #9c9c9c;
  }
  .ant-table-tbody > tr > td {
    font-size: 26px;
    font-weight: normal;
  }
  .ant-pagination.mini {
    font-size: 28px;
  }
  .ant-pagination.mini .ant-pagination-prev,
  .ant-pagination.mini .ant-pagination-next {
    min-width: 0.85rem;
    height: 0.85rem;
    margin: 0;
    line-height: 0.85rem;
  }
  .ant-pagination.mini .ant-pagination-item {
    min-width: 0.85rem;
    height: 0.85rem;
    margin: 0;
    line-height: 0.85rem;
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: #fff;
  }
  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-up.on,
  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-down.on {
    color: #ff5e14;
  }
}
</style>
