<template>
  <div>
    <h1 class="display-3">{{countryName }}</h1>
    <SectorsByCountryBar :countryCode="countryCode" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SectorsByCountryBar from '@/components/visualizations/SectorsByCountryBar'

export default {
  components: {
    SectorsByCountryBar
  },
  computed: {
    ...mapGetters([
      'dataByCountry'
    ]),
    countryName () {
      return this.data && this.data.name
    },
    data () {
      return this.dataByCountry[this.countryCode]
    }
  },
  props: {
    countryCode: {
      type: String,
      default: 'USA'
    }
  }
}
</script>
