<!-- Reference implementation -->
<!-- To understand how this works read manage-ptsvl-cards/load-search-phrases-and-handle-selection.vue -->
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '@/components/pt-info/single/1time-Mrow-1Field/mental-status-examdb/client-side/structure/table-master-list-of-mental-status-exam.js'

export default {
  data() {
    return {}
  },
  mounted() {
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '1', // this is uuid-1 to easily distinhuish it from the same row field -> id
        mentalStatusExamDescription: 'Good grooming and hygiene',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '2',
        mentalStatusExamDescription: 'No apparennt distress',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '3',
        mentalStatusExamDescription: 'Well developed, well nourished',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '4',
        mentalStatusExamDescription: 'Appears stated age',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '5',
        mentalStatusExamDescription: 'Appears younger than stated age',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '6',
        mentalStatusExamDescription: 'Appears older than stated age',
        mentalStatusExamCategory: 'Appearence',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '7',
        mentalStatusExamDescription: 'Obese',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '8',
        mentalStatusExamDescription: 'Thin or cachectic',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '9',
        mentalStatusExamDescription: 'Disheveled, unkempt',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '10',
        mentalStatusExamDescription: 'Malodorous',
        mentalStatusExamCategory: 'Appearance',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '11',
        mentalStatusExamDescription: 'Pleasant and cooperative',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '12',
        mentalStatusExamDescription: 'Uncooperative',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '13',
        mentalStatusExamDescription: 'Hostile or defiant',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '14',
        mentalStatusExamDescription: 'Guarded',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Evasive',
        mentalStatusExamCategory: 'Attitude',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Apathetic',
        mentalStatusExamCategory: 'Attitude',
      },
    })
      clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Disorganized behavior',
        mentalStatusExamCategory: 'Attitude',
      },
    })
        clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '14',
        mentalStatusExamDescription: 'Agitated',
        mentalStatusExamCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Retarded',
        mentalStatusExamCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Appropriate',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Downcast',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
  clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Intense',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Fleeting',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
      clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Regular, rate and rhythm',
        mentalStatusExamCategory: 'Speech',
      },
    })
        clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '14',
        mentalStatusExamDescription: 'Agitated',
        mentalStatusExamCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Retarded',
        mentalStatusExamCategory: 'Psychomotor',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Appropriate',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
    clientSideTblMasterMentalStatusExam.insert({
      data: {
        mentalStatusExamMasterId: '15',
        mentalStatusExamDescription: 'Downcast',
        mentalStatusExamCategory: 'Eye-contact',
      },
    })
  },
}
</script>
