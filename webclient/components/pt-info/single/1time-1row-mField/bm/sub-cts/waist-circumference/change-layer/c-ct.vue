<!-- Master doc is at reference implementation name/change-layer/c-ct.vue. This file has doc unique to this ct 
This acts as reference implementation for other Cts that use a graph.
So the heierarchy is:

Name
 1. No graph needed
 2. Graph needed
      A. Weight            (Doc of name is not repeated but has doc related to graph)
          1. Height        (Doc of name and weight is not repeated)
          2. BMI


Code synced with ref implementation on 4th august 2020

-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form>
          <el-form-item>
            <el-input
              placeholder="Waist Circumference In Inches"
              :value="mfGetCopiedRowBeingChangedFldVal('waistCircumferenceInInches')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'waistCircumferenceInInches')"
            >
            </el-input>
            <!-- element.io "By default, the component accepts and emits a Date object."  Ref: https://element.eleme.io/#/en-US/component/date-picker#date-formats
             Date object has date in a string. To accept a timestamp format the prop sent to the Ct is
             value-format="timestamp"
        -->
            <el-date-picker
              :value="mfGetCopiedRowBeingChangedFldVal('timeOfMeasurement')"
              type="date"
              placeholder="Pick a day"
              :picker-options="pickerOptions"
              format="yyyy/MM/dd"
              value-format="timestamp"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'timeOfMeasurement')"
            >
            </el-date-picker>
            <el-input
              placeholder="Notes"
              type="textarea"
              :autosize="{ minRows: 2 }"
              :value="mfGetCopiedRowBeingChangedFldVal('notes')"
              @input="mfSetCopiedRowBeingChangedFldVal($event, 'notes')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="cfHasSomeFldChanged" type="primary" plain @click="mfOnSubmit"
              >Submit</el-button
            >
            <el-button :disabled="cfHasSomeFldChanged" type="warning" plain @click="mfOnResetForm"
              >Reset form</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <ctWaistCircumferenceGraph form-type="sub-part-of-another-form"></ctWaistCircumferenceGraph>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ctWaistCircumferenceGraph from '@/components/pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/view-layer/line-graph-ct.vue'
import mxc from '../com-mx/change-layer.js'

export default {
  components: { ctWaistCircumferenceGraph },
  mixins: [mxc],
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
  },
}
</script>
