<!--
  <van-field-datetime-picker
    label="预计签单时间"
    placeholder="请选择"
    v-model="model.planDate"
    required
    :border="true"
  />
-->

<template>
  <div class="van-field-datetime-picker" :class="$attrs.border ? 'border' : ''">
    <van-field :border="false" v-model="result" v-bind="$attrs" readonly is-link @click="show = !show" />

    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        type="datetime"
        v-model="pickerResult"
        :title="$attrs.label"
        @cancel="show = !show"
        @confirm="onConfirm"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  model: {
    prop: 'currentTime',
  },
  props: {
    minDate: {
      type: Date,
      default: () => new Date(2019, 0, 1),
    },
    maxDate: {
      type: Date,
      default: () => new Date(2025, 12, 31),
    },
    currentTime: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      result: '',
      pickerResult: '',
    }
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      } else if (type === 'minute') {
        return `${val}分`
      }
      return val
    },
    onConfirm(time) {
      this.result = moment(time).format('YYYY-MM-DD HH:mm:ss')
      this.show = !this.show
    },
    __init() {
      this.pickerResult = new Date(this.currentTime)
    },
  },
  watch: {
    show(newVal) {
      if (newVal && !this.currentTime) {
        this.pickerResult = new Date()
      }
    },
    currentTime: function(newVal) {
      this.__init()
      if (newVal) {
        this.result = moment(newVal).format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.result = ''
      }
    },
    result(newVal) {
      if (newVal) {
        this.$emit('input', moment(newVal).format('YYYY-MM-DD HH:mm:ss'))
      } else {
        this.$emit('input', '')
      }
    },
  },
  mounted() {
    // this.__init()
  },
}
</script>

<style lang="scss" scoped>
.van-field-datetime-picker {
  &.border {
    position: relative;
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 32px;
      border-bottom: 2px solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
</style>
