<template>
    <div class="paradigm-tables-data" v-if="table">
      <div class="view-title" v-if="title">
        <span @click="toggleShowDetails" ><span v-html="title"></span> <i class="arrow" :class="showClass"></i></span>
        <feedback-item type-value="checkbox" :dop-info = "dopInfo" label="wrong table" @saveFeedback="saveFeedback" />
      </div>
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
import FeedbackItem from '@/components/check-homonym/feedback-item.vue'

export default {
  name: 'ParadigmTable',
  components: {
    FeedbackItem
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
    },
    dopInfo () {
      return {
        paradigmTableTitle: this.title.replace('<b>', '').replace('</b>', '')
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
    },
    saveFeedback (dopInfo, label, value) {
      this.$emit('saveFeedback', dopInfo, label, value)
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
