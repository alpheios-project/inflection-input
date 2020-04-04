<template>
    <div class="paradigm-tables-data" v-if="views && views.length > 0">
        <div class="paradigm-tables-data-item" v-for="(view, viewId) of views" v-bind:key="viewId" >
            <paradigm-table :table="view.wideTable" :title="getTitle(view)" @saveFeedback="saveFeedback"/>

            <div v-for="(table, tableId) in view.wideSubTables" v-bind:key="tableId">
              <paradigm-table :table="table" @saveFeedback="saveFeedback"/>
            </div>
        </div>
    </div>
</template>
<script>
import ParadigmTable from '@/components/check-homonym/paradigm-table.vue'
export default {
  name: 'ParadigmTablesData',
  components: {
    ParadigmTable
  },
  props: {
    views: Array
  },
  data () {
    return {
      showDetails: true
    }
  },
  computed: {
  },
  methods: {
    getTitle (view) {
      return '<b>' + view.paradigm.paradigmID + '</b> - ' + view.title
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
</style>
