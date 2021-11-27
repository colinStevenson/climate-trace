import { createStore } from 'vuex'
import data from '@/data/climatetrace_emissions_by_subsector_timeseries_interval_year_since_2015_to_2020.json'
import {
  getDataByCountry,
  getCountriesFromData,
  getSectors
} from '@/data/transformations'

export const store = createStore({
  state () {
    return {
      countries: null,
      dataByCountry: null,
      sectors: null
    }
  },
  getters: {
    countries: state => {
      const dataByCountry = state.dataByCountry || getDataByCountry(data)
      state.dataByCountry = dataByCountry
      state.countries = state.countries || getCountriesFromData(dataByCountry)
      return state.countries
    },
    dataByCountry: state => {
      state.dataByCountry = state.dataByCountry || getDataByCountry(data)
      return state.dataByCountry
    },
    sectors: state => {
      state.sectors = state.sectors || getSectors(data)
      return state.sectors
    }
  }
})

