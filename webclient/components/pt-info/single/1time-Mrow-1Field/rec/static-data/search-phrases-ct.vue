<script>
import clientSideTblSearchPhrasesOfCt from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table'
import tblCTLifeCycle from '@/components/core/ctMaster/db/client-side/structure/orm-ct-life-cycle'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    tblCTLifeCycle.insert({
      data: {
        name: 'recommendations',
        status: 3,
      },
    })

    // Step 2/3: Inserting Search interfaces to this component
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rex',
        ctToShow: 'pt-info/single/rec/view-layer/timeline.vue',
        displayLocation: 'ptsVl',
      },
    })

    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arex',
        ctToShow: 'pt-info/single/rec/view-layer/table-ct.vue',
        displayLocation: 'cl',
      },
    })
  },
}
</script>
