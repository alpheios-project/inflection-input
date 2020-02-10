<template>
  <div class="check-word">
      <upload-words-form @uploadedWordsFromFile = "uploadedWordsFromFile"/>
      <get-word-form
        @receive="receiveHomonym"  @changeGetShortDefinitions = "changeGetShortDefinitions"
        :wordListFromFile = "wordListFromFile"/>
      <download-form :feedbackData="feedbackData" @clearFeedbackData="clearFeedbackData" />
      <div class="homonym-block" v-for="(homonymData, homonymID) of homonyms" v-bind:key="homonymID">
        <homonym-data :homonym="homonymData.homonym" :views="homonymData.paradigmViews" :id="homonymID + 1" :showDefinitions="showDefinitions" @saveFeedback="saveFeedback"/>
      </div>
  </div>
</template>
<script>
import UploadWordsForm from '@/components/check-homonym/upload-words-form.vue'
import GetWordForm from '@/components/check-homonym/get-word-form.vue'
import HomonymData from '@/components/check-homonym/homonym-data.vue'
import DownloadForm from '@/components/check-homonym/download-form.vue'

import GetHomonymData from '@/services/get-homonym-data.js'

export default {
  name: 'CheckHomonym',
  components: {
    UploadWordsForm,
    GetWordForm,
    HomonymData,
    DownloadForm
  },
  data () {
    return {
      wordListFromFile: null,
      homonym: null,
      paradigmViews: null,
      homonyms: [],
      showDefinitions: false,
      feedbackData: [],
      separator: ';'
    }
  },
  computed: {
  },
  methods: {
    uploadedWordsFromFile (wordListFromFile) {
      this.wordListFromFile = wordListFromFile
    },
    receiveHomonym (homonym) {
      if (!homonym) {
        this.homonyms = []
        this.paradigmViews = null
      } else {
        const inflectionsViewSet = GetHomonymData.getInflectionSet(homonym)
        let paradigmViews = inflectionsViewSet.matchingViews.filter((view, index, self) => view.paradigm && view.render())
        const paradigmIDs = paradigmViews.map(view => view.paradigm.paradigmID)

        paradigmViews = paradigmViews.filter((view, index, self) => paradigmIDs.indexOf(view.paradigm.paradigmID) === index)

        this.homonyms.push({
          homonym: homonym,
          paradigmViews: paradigmViews
        })
      }
    },
    changeGetShortDefinitions (getShortDefinitions) {
      this.showDefinitions = getShortDefinitions
    },

    saveFeedback (dopInfo, label, value) {
      this.feedbackData.push({
        label,
        value,
        targetWord: dopInfo.targetWord ? dopInfo.targetWord : '',
        lexID: dopInfo.lexID ? dopInfo.lexID : '',
        lemma: dopInfo.lemma ? dopInfo.lemma : '',
        inflFeatures: dopInfo.inflFeatures ? dopInfo.inflFeatures : '',
        paradigmTableTitle: dopInfo.paradigmTableTitle ? dopInfo.paradigmTableTitle : ''
      })
    },

    clearFeedbackData () {
      this.feedbackData = []
    }
  }
}

</script>
<style  lang="scss">

</style>
