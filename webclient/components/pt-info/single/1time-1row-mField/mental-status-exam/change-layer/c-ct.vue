<template>
  <div>
    <el-input placeholder="Filter text" v-model="userTypedKeyword" />
    <div
      v-for="(allMentalStatusExamInsideAGroup,
      groupNameGivenAsIndex) in cfGetMasterListOfMentalStatusExamGrouped"
      :key="allMentalStatusExamInsideAGroup.id"
    >
      {{ groupNameGivenAsIndex }}
      <div class="grid-container">
        <div v-for="ss in allMentalStatusExamInsideAGroup" :key="ss.mentalStatusExamMasterId">
          <div v-if="mfCheckIfThisExistsInChildTable(ss)">
            <el-button
              @click="mfToggleMentalStatusExam(ss.mentalStatusExamMasterId)"
              type="primary"
              >{{ ss.mentalStatusExamDescription }}</el-button
            >
          </div>
          <div v-else>
            <el-button @click="mfToggleMentalStatusExam(ss.mentalStatusExamMasterId)">{{
              ss.mentalStatusExamDescription
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '../db/client-side/structure/table-master-list-of-mental-status-exam.js'
import clientSideTblPatientMentalStatusExam from '../db/client-side/structure/table-mental-status-exam-of-a-patient.js'

export default {
  data() {
    return {
      userTypedKeyword: '',
    }
  },
  computed: {
    cfGetMasterListOfMentalStatusExamGrouped() {
      console.log('cf called')
      const arOfObjectsFromClientSideMasterDB = clientSideTblMasterMentalStatusExam
        .query()
        .with('tblMentalStatusExamForPatientLink')
        .where('ROW_END', 2147483647.999999)
        .where((_record, query) => {
          query
            .where('mentalStatusExamCategory', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
            .orWhere('mentalStatusExamDescription', (value) =>
              value.toLowerCase().includes(this.userTypedKeyword.toLowerCase())
            )
        })
        .get()

      // Apply rules given by doctors

      // Rule1: If one "Modality of Psychotherapy" exists PatientMentalStatusExam table then do not show others
      let modalityOfPsychotherapyExists = clientSideTblPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .whereHas('tblMentalStatusExamMasterLink', (query) => {
          query.where('mentalStatusExamCategory', 'Modality of Psychotherapy')
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      //  (query) => { query.where('mentalStatusExamCategory', 'Modality of Psychotherapy') })

      console.log('modalityOfPsychotherapyExists', modalityOfPsychotherapyExists)

      if (modalityOfPsychotherapyExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          if (
            arOfObjectsFromClientSideMasterDB[i].mentalStatusExamCategory ===
            'Modality of Psychotherapy'
          ) {
            if (arOfObjectsFromClientSideMasterDB[i].tblMentalStatusExamForPatientLink !== null) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row category=Modality of psychotherapy from array of SS allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }

      // Rule2: If one Time in psychotherapy then do not show others
      let timeInPsychotherapyExists = clientSideTblPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .whereHas('tblMentalStatusExamMasterLink', (query) => {
          query.where('mentalStatusExamCategory', 'Time in psychotherapy')
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log('timeInPsychotherapyExists', timeInPsychotherapyExists)

      if (timeInPsychotherapyExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          console.log(arOfObjectsFromClientSideMasterDB[i])
          if (
            arOfObjectsFromClientSideMasterDB[i].mentalStatusExamCategory ===
            'Time in psychotherapy'
          ) {
            if (arOfObjectsFromClientSideMasterDB[i].tblMentalStatusExamForPatientLink !== null) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row where category=Time in psychotherapy from array of SS allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }

      // Rule3: If one Time in psychotherapy then do not show others
      let totalTimeWithPatientExists = clientSideTblPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .whereHas('tblMentalStatusExamMasterLink', (query) => {
          query.where('mentalStatusExamCategory', 'Total time with patient')
        })
        .where('ROW_END', 2147483647.999999)
        .get()

      console.log('timeInPsychotherapyExists', totalTimeWithPatientExists)

      if (totalTimeWithPatientExists.length > 0) {
        for (let i = 0; i < arOfObjectsFromClientSideMasterDB.length; i++) {
          console.log(arOfObjectsFromClientSideMasterDB[i])
          if (
            arOfObjectsFromClientSideMasterDB[i].mentalStatusExamCategory ===
            'Total time with patient'
          ) {
            if (arOfObjectsFromClientSideMasterDB[i].tblMentalStatusExamForPatientLink !== null) {
              console.log('row is there in client table.')
            } else {
              console.log(
                'delete the row where category=Time in psychotherapy from array of SS allowed to be chosen by patient'
              )
              arOfObjectsFromClientSideMasterDB.splice(i, 1)
              i = i - 1
            }
          }
        }
      }

      // End: Now group the SS

      const ar = this.groupBy(arOfObjectsFromClientSideMasterDB, 'mentalStatusExamCategory')

      // console.log(ar)
      return ar
    },
  },
  methods: {
    groupBy(data, key) {
      // Ref: https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
      // `data` is an array of objects, `key` is the key (or property accessor) to group by
      // reduce runs this anonymous function on each element of `data` (the `item` parameter,
      // returning the `storage` parameter at the end
      return data.reduce(function (storage, item) {
        // get the first instance of the key by which we're grouping
        var group = item[key]

        // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
        storage[group] = storage[group] || []

        // add this item to its group within `storage`
        storage[group].push(item)

        // return the updated storage to the reduce function, which will then loop through the next
        return storage
      }, {}) // {} is the initial value of the storage
    },
    mfCheckIfThisExistsInChildTable(pSS) {
      // I am able to get the data from child table.
      if (pSS.tblMentalStatusExamForPatientLink) {
        if (pSS.tblMentalStatusExamForPatientLink.ROW_END === 2147483647.999999) {
          return true
        }
      }
      return false
    },
    mfToggleMentalStatusExam(pMentalStatusExamMasterId) {
      const exists = clientSideTblPatientMentalStatusExam
        .query()
        .where('mentalStatusExamMasterId', pMentalStatusExamMasterId)
        .where('ROW_END', 2147483647.999999)
        .get()
      if (exists.length > 0) {
        clientSideTblPatientMentalStatusExam.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: Math.floor(Date.now() / 1000),
          },
        })
      } else {
        clientSideTblPatientMentalStatusExam.insert({
          data: {
            mentalStatusExamMasterId: pMentalStatusExamMasterId,
          },
        })
      }
    },
  },
}
</script>
