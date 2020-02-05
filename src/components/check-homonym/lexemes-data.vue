<template>
  <div class="lexemes-data">
      <div class="lexemes-data-item" v-for="(lex, lexID) of homonym.lexemes" v-bind:key="lexID">
        <div class="lexemes-data-item__lemma"><b>{{ getLemma(lexID) }}</b></div>
        <div class="lexeme-data-item__inflection" v-for="(infl, inflID) of lex.inflections" v-bind:key="inflID">
          <span>{{ inflID + 1 }}.</span> <span class="lexeme-data-item__feature" v-for="(feature, featID) of infl.features" v-bind:key="featID">{{ getFeature(feature, infl) }}</span>
        </div>
      </div>

  </div>
</template>
<script>
import { Feature } from 'alpheios-data-models'

export default {
  name: 'LexemesData',
  components: {
  },
  props: {
    homonym: Object
  },
  data () {
    return {
      features: ['part', 'mood', 'number', 'person', 'tense', 'voice', 'stemtype', 'derivtype', 'declension', 'gender', 'dialect']
    }
  },
  computed: {
    featuresFull () {
      return this.features.map(feat => Feature.types[feat])
    }
  },
  methods: {
    getLemma (lexID) {
      return this.homonym.lexemes[lexID].lemma.word
    },
    getFeature (feature, infl) {
      return this.featuresFull.includes(feature) ? (infl[feature].value + '; ') : null
    }
  }
}

</script>
<style  lang="scss">
  .lexemes-data-item,
  .lexeme-data-item__inflection {
    padding-left: 15px;
  }
  .lexemes-data-item__lemma,
  .target-word,
  .lexeme-data-item__inflection {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .lexeme-data-item__feature {
    display: inline;
  }
</style>
