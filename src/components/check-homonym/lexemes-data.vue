<template>
  <div class="lexemes-data">
      <div class="lexemes-data-item" v-for="(lex, lexID) of homonym.lexemes" v-bind:key="lexID">
        <div class="lexemes-data-item__lemma">
          <b>{{ getLemma(lexID) }}</b> - <span class="lexemes-data-item__lemma-def">{{ getDefinitions(lexID) }}</span>
          <feedback-item type-value="checkbox" :dop-info = "createLemmaDopInfo(lexID)" label="wrong lemma" @saveFeedback="saveFeedback" />
        </div>
        <div class="lexeme-data-item__inflection" v-for="(infl, inflID) of lex.inflections" v-bind:key="inflID">
          <span class="lexeme-data-item__features">{{ getInflectionFeaturesData(lexID, inflID) }}</span>
          <feedback-item type-value="checkbox" :dop-info = "createInflectionDopInfo(lexID, inflID)" label="missing cell match" @saveFeedback="saveFeedback" />
        </div>
      </div>

  </div>
</template>
<script>
import { Feature } from 'alpheios-data-models'
import FeedbackItem from '@/components/check-homonym/feedback-item.vue'

export default {
  name: 'LexemesData',
  components: {
    FeedbackItem
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
      return this.featuresFull.includes(feature) ? (infl[feature].value + ', ') : ''
    },
    getDefinitions (lexID) {
      return this.definitions[lexID] ? this.definitions[lexID] : (this.showDefinitions ? 'Still no definitions' : '')
    },
    getInflectionFeaturesData (lexID, inflID) {
      const inflection = this.homonym.lexemes[lexID].inflections[inflID]
      let inflNum = inflID + 1

      let featuresStr = ''
      inflection.features.forEach(feat => { featuresStr = featuresStr + this.getFeature(feat, inflection) })

      if (featuresStr.length > 0) {
        featuresStr = featuresStr.substr(0, featuresStr.length - 2)
        featuresStr = inflNum.toString() + '. ' + featuresStr
      }
      return featuresStr
    },
    createLemmaDopInfo (lexID) {
      return {
        lexID: lexID + 1,
        lemma: this.getLemma(lexID)
      }
    },
    createInflectionDopInfo (lexID, inflID) {
      return {
        lexID: lexID + 1,
        lemma: this.getLemma(lexID),
        inflFeatures: this.getInflectionFeaturesData(lexID, inflID)
      }
    },
    saveFeedback (dopInfo, label, value) {
      this.$emit('saveFeedback', dopInfo, label, value)
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
  .lexeme-data-item__features {
    display: inline;
  }
  .lexemes-data-item__lemma-def {
    font-style: italic;
    font-weight: bold;
  }
</style>
