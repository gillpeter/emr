<!-- Reference implementation -->
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          placeholder="First name"
          :value="mfGetCopiedRowBeingChangedFldVal('firstName')"
          @input="mfSetCopiedRowBeingChangedFldVal($event, 'firstName')"
        >
        </el-input>
        <el-input
          placeholder="Middle name"
          :value="mfGetCopiedRowBeingChangedFldVal('middleName')"
          @input="mfSetCopiedRowBeingChangedFldVal($event, 'middleName')"
        ></el-input>
        <el-input
          placeholder="Last name"
          :value="mfGetCopiedRowBeingChangedFldVal('lastName')"
          @input="mfSetCopiedRowBeingChangedFldVal($event, 'lastName')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- as per element.io the default value of disabled is false -->
        <el-button :disabled="cfHasSomeFldChanged" type="success" plain @click="mfOnSubmit"
          >Submit</el-button
        >
        <el-button :disabled="cfHasSomeFldChanged" type="danger" plain @click="mfOnResetForm"
          >Reset form</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mxc from '../com-mx/change-layer.js'

export default {
  mixins: [mxc],
}
</script>
