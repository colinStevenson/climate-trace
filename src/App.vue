<template>
  <div>
    <AppHeader />
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>
<style src="../node_modules/bootstrap/dist/css/bootstrap.min.css" />
<style src="../node_modules/chartist/dist/chartist.min.css" />
<style src="../node_modules/bootstrap-vue-3/dist/bootstrap-vue-3.css" />
