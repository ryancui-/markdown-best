<template>
  <div class="md-best__preview">
    <div class="markdown-body md-best__preview-container" v-html="html"></div>
  </div>
</template>

<script>
import parser from '@/util/parser'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github.css'

export default {
  data() {
    return {
      html: ''
    }
  },
  watch: {
    '$store.state.source': {
      immediate: true,
      handler(val) {
        this.html = parser.render(val)
      }
    }
  }
}
</script>

<style lang="less">
  .md-best__preview {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .md-best__preview-container {
    padding: 45px;
  }
</style>
