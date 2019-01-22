<template>
  <div class="md-best__markdown-container">
    <div class="md-best__markdown-container-left">
      <editor></editor>
    </div>
    <div class="md-best__markdown-container-middle">
      <seperate-bar></seperate-bar>
    </div>
    <div class="md-best__markdown-container-right">
      <preview></preview>
    </div>
  </div>
</template>

<script>
import Editor from './Editor'
import SeperateBar from './SeperateBar'
import Preview from './Preview'

export default {
  components: {
    Editor,
    SeperateBar,
    Preview
  }
}
</script>

<style lang="less">
  .md-best__markdown-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(100% - 50px);
    display: flex;
    &-left, &-right {
      flex: 1;
      height: 100%;
    }
    &-middle {
      width: 10px;
      height: 100%;
    }
  }
</style>
