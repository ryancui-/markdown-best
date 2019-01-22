<template>
  <div class="md-best__editor">
    <textarea ref="editor" name="source" id="source" spellcheck="false" style="display: none;"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css'
import bus from '@/common/bus'

export default {
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    bus.$on('UpdateSource', this.handleUpdateSource)

    this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
      lineNumbers: true,
      mode: 'markdown',
      tabSize: 2,
      lineWrapping: true
    })

    this.editor.on('changes', (instance, changeObj) => {
      instance.save()
      this.$store.commit('setSource', instance.getTextArea().value)
    })

    this.editor.setOption('extraKeys', {
      Tab: cm => {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
        cm.replaceSelection(spaces)
      },
      'Ctrl-O': cm => {
        bus.$emit('OpenFile')
      },
      'Cmd-O': cm => {
        bus.$emit('OpenFile')
      }
    })
  },
  beforeDestroy() {
    bus.$off('UpdateSource', this.handleUpdateSource)
  },
  methods: {
    handleUpdateSource(source) {
      this.editor.doc.setValue(source)
    }
  }
}
</script>

<style lang="less">
  .md-best__editor {
    width: 100%;
    height: 100%;
    overflow: auto;

    /*::-webkit-scrollbar {*/
    /*width: 8px;*/
    /*}*/
    /*::-webkit-scrollbar-thumb {*/
    /*border-radius: 4px;*/
    /*background: #999999;*/
    /*}*/
    /*::-webkit-scrollbar-track {*/
    /*border-radius: 0;*/
    /*background: #fff;*/
    /*}*/
  }

  // Fix CodeMirror style
  body .CodeMirror {
    font-family: Monaco, Consolas, Courier New, monospace;
    height: 100%;
    font-size: 14px;
  }
</style>
