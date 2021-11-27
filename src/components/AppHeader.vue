<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container-fluid">
      <span class="navbar-brand">Climate Trace</span>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <b-dropdown
            id="dropdown-country"
            text="Country"
            class="nav-link"
          >
            <b-dropdown-item
              v-for="country in countries"
              :key="country.code"
              @click="countryCode = country.code"
            >
              {{ country.name }}
            </b-dropdown-item>
          </b-dropdown>
        </li>
        <li class="nav-item">
          <b-dropdown
            id="dropdown-sector"
            text="Sector"
            class="nav-link"
          >
            <b-dropdown-item
              v-for="sector in sectors"
              :key="sector"
              @click="sectorCode = sector"
              class="text-capitalize"
            >
              {{ sector }}
            </b-dropdown-item>
          </b-dropdown>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
      'countries',
      'sectors'
    ])
  },
  data () {
    return {
      countryCode: null,
      sectorCode: null,
    }
  },
  watch: {
    countryCode () {
      this.$router.push({ name: 'country', params: { countryCode: this.countryCode } })
    },
    sectorCode () {
      this.$router.push({ name: 'sector', params: { sectorCode: this.sectorCode }})
    }
  }
}
</script>
