// For ref implementation see name/db/orm.js
import rowManage from '~/cts/core/crud/row-manage.js'

const { v1: uuidv1 } = require('uuid')

let count = 0
const intUniqueID = () => ++count

export default class ptWaistCircumference extends rowManage {
  static entity = 'waistCircumference'
  static apiUrl = 'http://localhost:3000/waist-circumference'

  static graphSeries1FieldName = 'waistCircumferenceInInches'
  static graphSeries1Unit = 'Inches'

  static fields() {
    return {
      ...super.fields(),

      id: this.uid(() => intUniqueID()),
      uuid: this.uid(() => uuidv1()),

      waistCircumferenceInInches: this.number(null), // number type of vuex-orm will also store decimals
      timeOfMeasurement: this.number(null), // refer to /name/db/orm.js notes for ROW_END
      notes: this.string(null),
      recordChangedByUUID: this.string(null),
      recordChangedFromIPAddress: this.string(null),
      recordChangedFromSection: this.string(null),

      ROW_START: this.number(0),
      ROW_END: this.number(2147483647.999999),
    }
  }
}