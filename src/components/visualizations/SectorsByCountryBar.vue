<template>
  <div>
    <div class="form-group my-3">
      <ul class="nav nav-pills">
        <li
          class="nav-item"
          v-for="sector in sectors"
          :key="sector"
        >
          <button
            class="nav-link text-capitalize btn btn-link"
            :class="{'active': sector === this.sector }"
            @click="this.sector = sector"
            href="#"
          >
            {{ sector }}
          </button>
        </li>
      </ul>
      <!-- <div class="row d-none">
        <div class="col">
          <select
            class="form-control"
            name="sector"
            id="sector"
            v-model="sector"
          >
            <option
              v-for="sector in sectors"
              v-bind:key="sector"
              :value="sector"
            >
              {{ sector }}
            </option>
          </select>
        </div>
        <div class="col">
          <div
            class="form-check"
            v-for="subSector in subSectors"
            :key="subSector"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :value="subSector"
              :id="`subsector-${subSector}`"
              v-model="selectedSubSectors"
            >
            <label class="form-check-label" :for="`subsector-${subSector}`">
              {{ subSector }}
            </label>
          </div>
        </div>
      </div> -->
    </div>
    <figure>
      <div
        class="ct-chart ct-major-twelfth"
        ref="chart"
        v-if="hasSufficientData"
      >
      </div>
      <div
        v-else
        class="alert alert-light ct-chart ct-major-twelfth text-center"
      >
        No Data Available
      </div>
    </figure>
  </div>
</template>
<script>
import Chartist from 'chartist'
import numeral from 'numeral'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'countries',
      'dataByCountry'
    ]),
    countryData () {
      return this.dataByCountry[this.countryCode] || []
    },
    sectors () {
      const sectors = {}
      this.countryData.data.forEach(d => {
        sectors[d.sector] = d.sector
      })
      return Object.keys(sectors)
    },
    subSectors () {
      const subSectors = {}
      this.countryData.data.filter(d => {
        return d.sector === this.sector
      }).forEach(d => {
        subSectors[d.subsector] = d.subsector
      })
      return Object.keys(subSectors)
    }
  },
  data () {
    return {
      hasSufficientData: false,
      years: {},
      sector: null,
      subSector: null,
      selectedSubSectors: [],
    }
  },
  mounted () {
    this.sector = this.sector || this.sectors[0]
  },
  methods: {
    async getChartSeriesData () {
      const series = []
      this.subSectors.forEach(subSector => {
        series.push({
          name: subSector,
          data: this.countryData.data
            .filter(d => {
              this.years[d.end] = true
              return d.sector === this.sector &&
                d.subsector === subSector &&
                this.selectedSubSectors.includes(d.subsector)
            })
            .map(d => d.emissions)
        })
      })
      await this.setHasSufficientData(series)
      return series
    },
    getLabels () {
      return Object.keys(this.years)
        .map(y => new Date(y).getFullYear())
        .sort((a, b) => a - b)
    },
    async mountChart () {
      const series = await this.getChartSeriesData()
      if (this.hasSufficientData && this.$refs.chart) {
        this.chart = new Chartist.Bar(this.$refs.chart, {
           series,
           labels: this.getLabels()
        }, {
          axisX: {
          },
          axisY: {
            labelInterpolationFnc: function(val) {
              return  numeral(val).format('0a')
            }
          },
          stackBars: true
        })
      }
    },
    setHasSufficientData (series) {
      this.hasSufficientData = series.filter(set => {
        return set.data.length
      }).length > 0
    }
  },
  props: {
    countryCode: {
      type: String,
      required: true
    }
  },
  watch: {
    country () {
      this.mountChart()
    },
    sector () {
      this.mountChart()
    },
    subSectors () {
      this.selectedSubSectors = [...this.subSectors]
    },
    selectedSubSectors () {
      this.mountChart()
    }
  }
}
</script>
<style>
.ct-bar{
  stroke-width: 4vw;
}
</style>
