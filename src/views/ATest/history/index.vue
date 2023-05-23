<template>
  <div>
    <van-tabs
      type="card"
      style="padding:15px 0; margin-bottom:200px;"
    >
      <van-tab
        title="历史委托"
        style="margin-top:15px;"
      >
        <template v-for="item in list">
          <BuyItem
            :item="item"
            :key="item.id"
            timeType="day"
          ></BuyItem>
        </template>
      </van-tab>
      <van-tab title="历史成交"></van-tab>
    </van-tabs>

  </div>
</template>

<script>
import BuyItem from '../BuyItem'
import { BuyList } from '../dataConfig'
export default {
  components: {
    BuyItem,
  },
  data() {
    return {
      active: 3,
      list: BuyList,
    }
  },
  computed: {},
}
</script>

<style scoped lang="scss">
.img-01 {
  width: 100%;
}
</style>
