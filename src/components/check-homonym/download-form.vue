<template>
  <div class="download-feedback">
      <h2 :class="{ download_feedback_disabled: feedbackData.length === 0 }">Download Check Paradigms Notes</h2>
      <div class="download-feedback-block">
        <button class="download-feedback-button" @click="downloadList" :disabled="feedbackData.length === 0">Download notes</button>
        <span class="download-feedback-clear" @click="clearFeedbackData" :disabled="feedbackData.length === 0">Clear notes</span>
      </div>
  </div>
</template>
<script>
import Download from '@/services/download.js'

export default {
  name: 'DownloadForm',
  components: {
  },
  props: {
    feedbackData: Array
  },
  data () {
    return {
    }
  },
  methods: {
    downloadList () {
      let source = this.feedbackData
      source.sort((a, b) => (a.targetWord > b.targetWord) ? 1 : ((b.targetWord > a.targetWord) ? -1 : 0))

      const exportFields = [ 'targetWord', 'lexID', 'lemma', 'inflFeatures', 'paradigmTableTitle', 'label', 'value' ]
      const result = Download.collectionToCSV(';', exportFields)(source)
      Download.downloadBlob(result, `check-paradigms.csv`)
    },
    clearFeedbackData () {
      this.$emit('clearFeedbackData')
    }
  }
}
</script>
<style  lang="scss">
  .download_feedback_disabled {
      opacity: 50%;
  }
  .download-feedback-button {
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    padding: 5px 15px;
    vertical-align: middle;
    border: 1px solid #c64906;
    border-radius: 5px;
    background: #c64906;
    font-size: 14px;
    outline: none;

    &:disabled {
        opacity: 50%;
    }
  }

  .download-feedback-clear {
    margin-left: 50px;
    font-weight: bold;
    color: #c64906;
    cursor: pointer;
    display: inline-block;
    padding: 5px 15px;
    vertical-align: middle;
    border: 1px solid #c64906;
    border-radius: 5px;
    background: #eee;
    font-size: 14px;
    outline: none;

    &:disabled {
        opacity: 50%;
    }
  }
</style>
