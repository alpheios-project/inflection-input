<template>
  <div class="upload-words">
      <h2>Upload words from *.txt file</h2>
      <div class="upload-words-block">
        <input type="file" name="uploadWordsFile" ref="uploadWordsFile" @change="filesChange"  accept="*.txt" class="upload-words-file-input">
        <span class="upload-words-clear" @click="clearInputFile">Clear file input</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'UploadWordsForm',
  components: {
  },
  data () {
    return {
      fileName: null
    }
  },
  methods: {
    filesChange (event) {
      if (!event.target.files || event.target.files.length === 0) {
        return
      }
      const file = event.target.files[0]
      this.fileName = file.name
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (event) => {
        const filesSourceText = reader.result
        this.$emit('uploadedWordsFromFile', filesSourceText)
      }
    },
    clearInputFile () {
      this.$refs.uploadWordsFile.value = ''
    }
  }
}
</script>
<style>
  .upload-words-clear {
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
  }
</style>
