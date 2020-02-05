<template>
    <div class="paradigm-tables-data" v-if="table">
      <div class="view-title" @click="toggleShowDetails"><span v-html="title"></span> <i class="arrow" :class="showClass"></i></div>
      <div class="infl-prdgm-tbl" v-show="showDetails">
        <div class="infl-prdgm-tbl__row" v-for="(row, rowID) in table.rows" v-bind:key="rowID">
          <div :class="cellClasses(cell)" class="infl-prdgm-tbl__cell" v-for="(cell, cellID) in row.cells" v-bind:key="cellID">
            {{cell.value}}
          </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {
  name: 'ParadigmTable',
  components: {
  },
  props: {
    table: Object,
    title: String
  },
  data () {
    return {
      showDetails: true
    }
  },
  computed: {
    showClass () {
      return {
        'hidden': !this.showDetails,
        'shown': this.showDetails
      }
    }
  },
  methods: {
    cellClasses: function (cell) {
      return {
        'infl-prdgm-tbl-cell--label': (cell.role === 'label'),
        'infl-prdgm-tbl-cell--data': (cell.role === 'data'),
        'infl-prdgm-tbl-cell--full-match': (cell.role === 'data') && cell.fullMatch
      }
    },
    toggleShowDetails () {
      this.showDetails = !this.showDetails
    }
  }
}

</script>
<style  lang="scss">
    .paradigm-tables-data {
        margin-top: 20px;
    }

    .view-title {
        cursor: pointer;
        margin-bottom: 20px;
    }

      // region Paradigm table styles
  .infl-prdgm-tbl {
    display: table;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    margin-bottom: 30px;
  }

  .infl-prdgm-tbl__row {
    display: table-row;
  }

  .infl-prdgm-tbl__cell {
    display: table-cell;
    padding: 2px 5px;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    min-width: 20px;
  }

  .infl-prdgm-tbl-cell--label {
    font-weight: 700;
  }

  .infl-prdgm-tbl-cell--full-match {
    background-color: #F6D918;
    font-weight: 700;
  }
</style>
