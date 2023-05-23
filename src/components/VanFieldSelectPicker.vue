<!--
<van-field-select-picker
    label="拜访类型"
    placeholder="请选择"
    v-model="xxx"
    :columnsKeyValue="[{id: '1', name: '张三'},{id: '2', name: '李四'}]"
  />
-->

<template>
  <div class="van-field-select-picker" :class="$attrs.border ? 'border' : ''">
    <van-field :border="false" v-model="result" v-bind="$attrs" readonly :is-link="isLink" @click="show = !show" />
    <van-popup v-model="show" position="bottom">
      <van-picker
        :columns="columns"
        :default-index="defaultIndex"
        show-toolbar
        :title="$attrs.label"
        @cancel="show = !show"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'selectKey',
  },
  props: {
    columnsKeyValue: {
      type: Array,
    },
    selectKey: {
      type: [String, Number],
    },
    isLink: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      columns: [],
      defaultIndex: null,
      show: false,
      result: '',
    }
  },
  methods: {
    onConfirm(value) {
      this.result = value
      this.show = !this.show
    },
    __init() {
      // 初始化列表项
      this.columns = this.columnsKeyValue.map(item => item.name)
      // 初始化选中项
      if (this.selectKey === 0 || !!this.selectKey) {
        this.defaultIndex = this.columnsKeyValue.findIndex(item => item.id === this.selectKey)
        let findItem = this.columnsKeyValue.find(item => item.id === this.selectKey)
        if (findItem) {
          this.result = findItem.name || ''
        }
      } else {
        this.result = ''
      }
    },
  },
  watch: {
    selectKey() {
      this.__init()
    },
    result(newVal) {
      if (newVal) {
        let selectedAttr = this.columnsKeyValue.find(item => item.name === newVal)
        this.$emit('input', selectedAttr.id, selectedAttr)
      } else {
        this.$emit('input', '', {})
      }
    },
  },
  mounted() {
    if (!this.selectKey) {
      this.__init()
    }
  },
}
</script>

<style lang="scss" scoped>
.van-field-select-picker {
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
