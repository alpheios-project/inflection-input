<template>
  <div class="upload-words">
      <h2>Upload words from *.txt file</h2>
      <div class="upload-words-block">
        <input type="file" name="uploadWordsFile" @change="filesChange"  accept="*.txt" class="custom-file-input">
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
    }
  }
}
</script>
<style>

</style>
