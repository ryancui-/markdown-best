<template>
  <div class="md-best__tools-container">
    <input type="file" style="display: none;" ref="fileInput" @change="handleFileChange">
    <span>Markdown Best</span>
  </div>
</template>

<script>
import bus from '@/common/bus'

export default {
  created() {
    bus.$on('OpenFile', this.handleOpenFile)
  },
  beforeDestroy() {
    bus.$off('OpenFile', this.handleOpenFile)
  },
  methods: {
    handleOpenFile() {
      this.$refs.fileInput.click()
    },
    // 加载打开的文件到editor中
    handleFileChange(e) {
      const files = e.target.files
      if (files.length > 0) {
        const file = files[0]
        const reader = new FileReader()

        reader.onload = e => {
          document.title = file.name
          bus.$emit('UpdateSource', reader.result)
        }
        reader.readAsText(file)
      }
    }
  }
}
</script>

<style lang="less">
  .md-best__tools-container {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
</style>
