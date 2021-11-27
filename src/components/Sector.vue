<template>
  <div>
    <h1 class="display-3 text-capitalize">{{ sectorCode }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    sectorCode: {
      type: String,
      default: 'agriculture'
    }
  }
}
</script>
