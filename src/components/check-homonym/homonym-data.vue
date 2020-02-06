<template>
    <div class="homonym-data-block" v-if="homonym">
        <div class="target-word" @click="toggleShowDetails"><b>{{ id }}.</b> <b>Target word</b> - {{ homonym.targetWord }} ({{ homonym.language }}) <i class="arrow" :class="showClass"></i></div>
        <div class="homonym-data-block-details" v-show="showDetails" >
            <lexemes-data :homonym="homonym" v-if="homonym" :showDefinitions="showDefinitions" />
            <paradigm-tables-data :views="views" />
        </div>
    </div>
</template>
<script>
import LexemesData from '@/components/check-homonym/lexemes-data.vue'
import ParadigmTablesData from '@/components/check-homonym/paradigm-tables-data.vue'

export default {
  name: 'CheckHomonym',
  components: {
    LexemesData,
    ParadigmTablesData
  },
  props: {
    homonym: Object,
    views: Array,
    id: Number,
    showDefinitions: Boolean
  },
  data () {
    return {
      showDetails: false
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
    toggleShowDetails () {
      this.showDetails = !this.showDetails
    }
  }
}

</script>
<style  lang="scss">
    .target-word {
        cursor: pointer;
    }

    i {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        margin-left: 10px;

        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;

        &.hidden {
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
        }

        &.shown {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
    }
</style>
