<template>
  <span class="feedback-items">
    <span class="feedback-item feedback-item-checkbox" v-if="typeValue === 'checkbox'">
        <input type="checkbox" :id="checkboxName" v-model="checkboxValue" @change="changeCheckbox">
        <label :for="checkboxName">{{ label }}</label>
    </span>
    <span class="feedback-item feedback-item-input" v-if="typeValue === 'text'">
        <label :for="inputName">{{ label }}</label>
        <input type="text" :id="inputName" v-model="textValue" @change="changeInput" @key.enter="changeInput">
    </span>
  </span>
</template>
<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'FeedbackItem',
  components: {
  },
  props: {
    label: String,
    typeValue: String,
    dopInfo: Object
  },
  data () {
    return {
      checkboxValue: false,
      textValue: ''
    }
  },
  computed: {
    checkboxName () {
      const id = uuidv4()
      return 'checkbox-' + id
    },
    inputName () {
      const id = uuidv4()
      return 'input-' + id
    }
  },
  methods: {
    changeCheckbox () {
      this.$emit('saveFeedback', this.dopInfo, this.label, this.checkboxValue)
    },
    changeInput () {
      this.$emit('saveFeedback', this.dopInfo, this.label, this.textValue)
    }
  }
}
</script>
<style  lang="scss">
    .feedback-item {
        display: inline-block;
        padding-left: 50px;
        color: #c64906;

        label {
            padding: 0 5px;
        }
    }
</style>
