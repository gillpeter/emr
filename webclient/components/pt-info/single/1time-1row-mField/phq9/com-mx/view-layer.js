// Master doc is at reference implementation name/com-mx/view-layer.js. This file has doc unique to this ct
// Code synced with ref implementation on 18th august 2020

import moment from 'moment'

import mxFullSyncWithDbServer from '../db/full-sync-with-db-server-mixin'
import objOrm from '../db/client-side/structure/table.js'
export default {
  mixins: [mxFullSyncWithDbServer],
  data() {
    return {
      isMounted: false,
      dataFldsOfToChangeAndCopiedRowsAreSame: true,
    }
  },
  computed: {
    cfDataRow() {
      if (!this.isMounted) return ''
      const arFromOrm = objOrm.fnGetRowsToChange()
      if (arFromOrm.length) {
        const rowtoReturn = arFromOrm[0]
        for (const k in this.dataFldsOfToChangeAndCopiedRowsAreSame)
          rowtoReturn[k] = this.dataFldsOfToChangeAndCopiedRowsAreSame[k]
        return rowtoReturn
      } else {
        return ''
      }
    },
    cfPosInArCardsInPtsOfVl() {
      if (!this.isMounted) return false
      const arOfCardsInPtsOfVl = this.$store.state.vstObjCardsInPtsOfVl.arOfCardsInPtsOfVl
      const obj = arOfCardsInPtsOfVl.find((x) => x.label === objOrm.entity)
      const idx = arOfCardsInPtsOfVl.indexOf(obj)
      return idx
    },
    cfTimeOfMeasurement() {
      return moment(this.cfDataRow.timeOfMeasurement).format('MMM YYYY') // parse integer
    },
  },
  async mounted() {
    let eventName = ['event-from-ct', objOrm.entity, 'cl-copied-row-diff'].join('-')

    this.$root.$on(eventName, (pFldsWithDiff) => {
      this.dataFldsOfToChangeAndCopiedRowsAreSame = pFldsWithDiff
    })

    eventName = ['event-from-ct', objOrm.entity, 'cl-copied-row-same'].join('-')
    this.$root.$on(eventName, () => {
      this.dataFldsOfToChangeAndCopiedRowsAreSame = true
    })

    if (objOrm.query().count() > 0) {
    } else {
      await this.mxGetDataFromDb()
    }
    const arFromOrm = objOrm.fnGetRowsToChange()
    if (arFromOrm.length) {
      const rowtoReturn = arFromOrm[0]
      const vnOrmIdOfCopiedRowBeingChanged = objOrm.fnGetChangeRowIdInEditState(rowtoReturn.uuid)
      if (vnOrmIdOfCopiedRowBeingChanged === false) {
      } else {
        this.dataFldsOfToChangeAndCopiedRowsAreSame = objOrm.fnIsDataFldsOfRowsSame(
          rowtoReturn.id,
          vnOrmIdOfCopiedRowBeingChanged
        )
      }
      this.isMounted = true
    }
  },
  methods: {
    mfOpenCCtInCl(pOrmId) {
      console.log(pOrmId)
      const searchString = [objOrm.entity, 'change'].join(' - ')
      console.log(searchString)
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: searchString,
      })
    },
    mfTypeOfButton(pFldName) {
      if (this.dataFldsOfToChangeAndCopiedRowsAreSame === true) return 'default'

      if (pFldName in this.dataFldsOfToChangeAndCopiedRowsAreSame) {
        return 'warning'
      }
      return 'default'
    },
    mfSendSubmitEvent() {
      const eventName = ['event-from-ct', objOrm.entity, 'vl-save-this-row'].join('-')
      this.$root.$emit(
        eventName,
        this.dataFldsOfToChangeAndCopiedRowsAreSame.vnOrmIdOfCopiedRowBeingChanged
      )
    },
    mfSendResetFormEvent() {
      const eventName = ['event-from-ct', objOrm.entity, 'vl-reset-this-form'].join('-')
      this.$root.$emit(eventName)
    },
  },
}