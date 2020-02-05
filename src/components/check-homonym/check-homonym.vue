<template>
  <div class="check-word">
      <get-word-form @receive="receiveHomonym" />
      <div class="homonym-block" v-for="(homonymData, homonymID) of homonyms" v-bind:key="homonymID">
        <homonym-data :homonym="homonymData.homonym" :views="homonymData.paradigmViews" :id="homonymID + 1"/>
      </div>
  </div>
</template>
<script>
import GetWordForm from '@/components/check-homonym/get-word-form.vue'
import HomonymData from '@/components/check-homonym/homonym-data.vue'

import GetHomonymData from '@/services/get-homonym-data.js'

export default {
  name: 'CheckHomonym',
  components: {
    GetWordForm,
    HomonymData
  },
  data () {
    return {
      homonym: null,
      paradigmViews: null,
      homonyms: []
    }
  },
  computed: {
  },
  methods: {
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
    }
  }
}

</script>
<style  lang="scss">

</style>
