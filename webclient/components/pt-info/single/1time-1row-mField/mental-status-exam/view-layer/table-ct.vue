<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Mental status exam</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="mfOpenCCtInCl"
          >C</el-button
        >
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfServiceStatementForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDiscontinueServiceStatement(ss.clientSideUniqRowId)" type="primary"
            >{{ ss.tblMentalStatusExamMasterLink.mentalStatusExamCategory }}:
            {{ ss.tblMentalStatusExamMasterLink.mentalStatusExamDescription }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '../db/client-side/structure/table-master-list-of-mental-status-exam.js'
import clientSideTblPatientMentalStatusExam from '../db/client-side/structure/table-mental-status-exam-of-a-patient.js'

export default {
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDiscontinueServiceStatement(pClientSideUniqRowId) {
      clientSideTblPatientMentalStatusExam.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'change mental status exam',
      })
    },
  },
  async mounted() {},
}
</script>
