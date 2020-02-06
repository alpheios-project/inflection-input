<template>
  <div class="get-word">
      <h2>Check the word (<span>{{ languageName }}):</span></h2>
      <div class="get-word-form">
        <input class="get-word-form-input" v-model="words" placeholder="type a word" @keyup.enter="getTheWord" />
        <a class="get-word-form-button" @click="getTheWords">Get information</a>
        <p><input type="checkbox" id="get-word-form-checkbox" v-model="getShortDefinitions" @change="changeGetShortDefinitions"><label for="get-word-form-checkbox">get short definitions</label></p>
        <p class="get-word-form-message" v-if="message">{{ message }}</p>
      </div>
  </div>
</template>
<script>
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'
import GetHomonymData from '@/services/get-homonym-data.js'

export default {
  name: 'GetWordForm',
  components: {
  },
  props: {
    wordListFromFile: String
  },
  data () {
    return {
      word: null,
      words: null,
      languageID: Constants.LANG_GREEK,
      messages: {
        'empty': null,
        'lookup started': 'Lookup has started. Wait please a little.',
        'no rules': 'There are no matching rules!',
        'morph unknown error': `Something is going wrong with homonym lookup for - ${this.word}!`,
        'empty input': 'Type the word, please!'
      },
      message: null,
      getShortDefinitions: false
    }
  },
  watch: {
    wordListFromFile () {
      this.words = this.wordListFromFile
    }
  },
  computed: {
    languageName () {
      const langCode = LMF.getLanguageCodeFromId(this.languageID)
      if (langCode === 'grc') {
        return 'Greek'
      }
      return 'Other'
    }
  },
  methods: {
    async getTheWords () {
      this.message = this.messages['lookup started']
      this.$emit('receive', null)
      if (this.words) {
        const wordsCur = this.words.split(',').map(word => word.trim())

        wordsCur.forEach(async word => {
          let adapterRes = await this.getHomonym(word)
          if (adapterRes) {
            this.$emit('receive', adapterRes)
          }
        })
      } else {
        this.message = this.messages['empty input']
      }
    },

    async getHomonym (word) {
      let adapterRes = await GetHomonymData.getHomonym(word, this.languageID, this.getShortDefinitions)
      if (adapterRes.result) {
        this.message = ''
        return adapterRes.result
      } else {
        if (adapterRes.errors && adapterRes.errors.length > 0) {
          this.message = adapterRes.errors[0].message
        } else {
          this.message = this.messages['morph unknown error']
        }
      }
    },

    changeGetShortDefinitions () {
      this.$emit('changeGetShortDefinitions', this.getShortDefinitions)
    }
  }
}

</script>
<style  lang="scss">
    .get-word-form-button {
        display: inline-block;
        padding: 18px 20px;
        background: #185f6d;
        border: 1px solid #185f6d;

        color: #fff;
        text-decoration: none;
        cursor: pointer;
        // vertical-align: middle;
        border: 0;
        width: 20%;

        &:hover {
            background: #10424c;
        }
    }

    .get-word-form-input {
        display: inline-block;
        padding: 18px 20px;
        // vertical-align: middle;
        border: 1px solid #ddd;
        width: 70%;
        margin-bottom: 10px;
    }

    .get-word-form {
      margin-bottom: 20px;
    }

</style>
