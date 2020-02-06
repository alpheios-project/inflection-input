<template>
  <div class="lexemes-data">
      <div class="lexemes-data-item" v-for="(lex, lexID) of homonym.lexemes" v-bind:key="lexID">
        <div class="lexemes-data-item__lemma"><b>{{ getLemma(lexID) }}</b> - <span class="lexemes-data-item__lemma-def">{{ getDefinitions(lexID) }}</span></div>
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
    homonym: Object,
    showDefinitions: Boolean
  },
  data () {
    return {
      features: ['part', 'mood', 'number', 'person', 'tense', 'voice', 'stemtype', 'derivtype', 'declension', 'gender', 'dialect']
    }
  },
  computed: {
    featuresFull () {
      return this.features.map(feat => Feature.types[feat])
    },
    definitions () {
      let definitions = []
      if (this.homonym && this.homonym.hasShortDefs) {
        definitions = this.homonym.lexemes.map(lexeme => {
          let result = ''
          lexeme.meaning.shortDefs.forEach(def => {
            result = result + def.text + '; '
          })
          return result.trim()
        })
      }
      return definitions
    }
  },
  methods: {
    getLemma (lexID) {
      return this.homonym.lexemes[lexID].lemma.word
    },
    getFeature (feature, infl) {
      return this.featuresFull.includes(feature) ? (infl[feature].value + '; ') : null
    },
    getDefinitions (lexID) {
      console.info('this.showDefinitions - ', this.showDefinitions)
      return this.definitions[lexID] ? this.definitions[lexID] : (this.showDefinitions ? 'Still no definitions' : '')
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
  .lexemes-data-item__lemma-def {
    font-style: italic;
    font-weight: bold;
  }
</style>
