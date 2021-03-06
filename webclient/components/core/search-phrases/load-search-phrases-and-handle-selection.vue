<template>
  <div id="manage-ptsvl-cards">
    <!-- Mount the Cts so I can get the search terms inside the ORM -->
    <feedSPhrases />
    <mapSPhrases />
    <clearSPhrases />
    <remSPhrases />
    <ssSPhrases />
    <mseSPhrases />
    <nameSPhrases />
    <weightSPhrases />
    <pulseSPhrases />
    <heightSPhrases />
    <temperatureSPhrases />
    <phq9SPhrases />
    <bmSPhrases />
    <bloodPressureSPhrases />
    <bloodSugarSPhrases />
    <oxygenSaturationSPhrases />
    <waistCircumferenceSPhrases />
    <dobSPhrases />
    <phoneNumberSPhrases />
    <el-autocomplete
      v-model="searchKeyword"
      class="inline-input"
      :fetch-suggestions="mfQuerySearchTerms"
      :placeholder="cfSearchBoxPlaceholder"
      style="width: 100%"
      :highlight-first-item="true"
      @select="mfHandleSuggestionSelectedByUser"
    ></el-autocomplete>
  </div>
</template>

<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'

// Goal: Get the search terms from each component
import feedSPhrases from '@/components/pt-info/combined/feed/static-data/search-phrases-ct'
import mapSPhrases from '@/components/pt-info/combined/map/static-data/search-phrases-ct'
import clearSPhrases from '@/components/core/clear/static-data/search-phrases-ct'
import nameSPhrases from '@/components/pt-info/single/1time-1row-mField/name/static-data/search-phrases-ct'
import heightSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/height/static-data/search-phrases-ct'
import weightSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/weight/static-data/search-phrases-ct'
import pulseSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/pulse/static-data/search-phrases-ct'
import temperatureSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/temperature/static-data/search-phrases-ct'
import bloodPressureSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/static-data/search-phrases-ct'
import bloodSugarSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/static-data/search-phrases-ct'
import waistCircumferenceSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/static-data/search-phrases-ct'
import oxygenSaturationSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/static-data/search-phrases-ct'
import phq9SPhrases from '@/components/pt-info/single/1time-1row-mField/phq9/static-data/search-phrases-ct'
import bmSPhrases from '@/components/pt-info/single/1time-1row-mField/bm/static-data/search-phrases-ct'
import dobSPhrases from '@/components/pt-info/single/1time-1row-mField/date-of-birth/static-data/search-phrases-ct'
import remSPhrases from '@/components/pt-info/single/1time-Mrow-1Field/reminder/db/client-side/static-data/search-phrases-ct'
import ssSPhrases from '@/components/pt-info/single/1time-Mrow-1Field/service-statement/db/client-side/static-data/search-phrases-ct'
import mseSPhrases from '@/components/pt-info/single/1time-1row-mField/mental-status-exam/db/client-side/static-data/search-phrases-ct'
import phoneNumberSPhrases from '@/components/pt-info/single/1time-Mrow-mField/phone-numbers/static-data/search-phrases-ct'

export default {
  components: {
    remSPhrases,
    ssSPhrases,
    mseSPhrases,
    feedSPhrases,
    clearSPhrases,
    mapSPhrases,
    nameSPhrases,
    heightSPhrases,
    weightSPhrases,
    pulseSPhrases,
    temperatureSPhrases,
    phq9SPhrases,
    bmSPhrases,
    bloodPressureSPhrases,
    bloodSugarSPhrases,
    waistCircumferenceSPhrases,
    oxygenSaturationSPhrases,
    dobSPhrases,
    phoneNumberSPhrases,
  },
  data() {
    return { searchKeyword: '' }
  },

  computed: {
    cfSearchBoxPlaceholder() {
      let arFromClientSideTable = {}
      arFromClientSideTable = clientSideTblSearchPhrasesOfCt
        .query()
        .orderBy('usageCountKeptInClientSideTable', 'desc')
        .get()
      const objRowFromOrm = arFromClientSideTable[0]
      if (objRowFromOrm) {
        return 'e.g. ' + objRowFromOrm.value
      } else {
        return 'e.g. screening'
      }
    },
  },
  mounted() {},
  methods: {
    mfQuerySearchTerms(pQueryString, pCallBack) {
      // pQueryString empty means user did not enter anything
      // to show values in dropdown returning all results
      if (!pQueryString) {
        const arFromClientSideTable = clientSideTblSearchPhrasesOfCt
          .query()
          .orderBy('usageCountKeptInClientSideTable', 'desc')
          .get()
        pCallBack(arFromClientSideTable)
      } else {
        const arFromClientSideTable = clientSideTblSearchPhrasesOfCt
          .query()
          .where('needsRowIdToWork', 'no') // For reasons read: search-inside-add-tab-in-cl-ct approx line 78
          .search(pQueryString.trim(), {
            // Search comes from vuex-orm plugn https://github.com/client-side/plugin-search#during-query-chain
            keys: ['value'], // If key is not specified it will search all fields https://github.com/client-side/plugin-search#during-query-chain
          })
          .orderBy('usageCountKeptInClientSideTable', 'desc')
          .get() // trim is needed for "goal " to match "goal"
        pCallBack(arFromClientSideTable)
      }
    },

    mfHandleSuggestionSelectedByUser(pSelectedSuggestion) {
      // Goal: Add the card in CsVl (Current state in View layer) or tab in CL (Change layer)

      const objCtToAdd = {
        label: pSelectedSuggestion.value,
        // Here I have to use a variable otherwise webpack gives error. https://stackoverflow.com/questions/57349167/vue-js-dynamic-image-src-with-webpack-require-not-working
        ctToShow: require('@/components/' + pSelectedSuggestion.ctToShow).default,
        id: pSelectedSuggestion.id,
        closable: true,
      }
      if (pSelectedSuggestion.displayLocation === 'ptsVl') {
        // ptsvl -> Current state of view layer
        this.$store.commit('mtfShowCardInCsVl', objCtToAdd)
      } else if (pSelectedSuggestion.displayLocation === 'cl') {
        // Change layer
        this.$store.commit('mtfShowNewFirstTabInCl', objCtToAdd)
      }

      /* Goal: Increase the usageCount of the search term so I can order them better
        Update query ref: https://vuex-orm.org/guide/data/inserting-and-updating.html#updates */
      clientSideTblSearchPhrasesOfCt.update({
        where: pSelectedSuggestion.id,
        data: {
          usageCountKeptInClientSideTable: pSelectedSuggestion.usageCountKeptInClientSideTable + 1,
        },
      })

      /* Goal: Once search work is done then the input area needs to be empty */
      this.searchKeyword = ''

      /* Goal: scrolling to top of the search input box */
      const options = {
        container: '#ptsvl',
        easing: 'ease-in',
        offset: 6000, // if offset is negative I do not come on top of search box. Not sure what this means
        force: true,
        cancelable: true,
      }
      this.$scrollTo('#manage-ptsvl-cards', 500, options)
    },
  },
}
</script>
