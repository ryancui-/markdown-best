<template>
  <div>
    <tools-container></tools-container>
    <markdown-container></markdown-container>
  </div>
</template>

<script>
import ToolsContainer from './components/ToolsContainer'
import MarkdownContainer from './components/MarkdownContainer'

window.onbeforeunload = () => ''

export default {
  name: 'App',
  components: {
    ToolsContainer,
    MarkdownContainer
  }
}
</script>

<style>
  html, body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
