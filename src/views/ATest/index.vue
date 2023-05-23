<template>
  <div>
    <Header></Header>
    <van-grid :column-num="3">
      <template v-for="item in menus">
        <van-grid-item
          v-if="item.hasPermission && item.hasPermission.length"
          :key="item.id"
          :icon="item.icon"
          :color="item.color"
          :text="item.text"
          :to="item.to"
          :url="item.url"
          v-show="item.hasShow"
          v-has-permission="item.hasPermission"
        >
          <van-icon slot="icon" :name="item.icon" :color="item.color" size="1.02rem" />
        </van-grid-item>
        <van-grid-item
          v-else
          :key="item.id"
          :icon="item.icon"
          :color="item.color"
          :text="item.text"
          :to="item.to"
          :url="item.url"
          v-show="item.hasShow"
        >
          <van-icon slot="icon" :name="item.icon" :color="item.color" size="1.02rem" />
        </van-grid-item>
      </template>
    </van-grid>
    <van-empty description="权限千万种,请找管理员要一种！" v-has-no-permission="allPremission" />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      // 菜单配置
      menus: [
        {
          icon: 'hotel-o',
          color: '#07961f',
          text: '计算',
          to: '/test-computer',
          hasShow: true,
        },
        {
          icon: 'hotel-o',
          color: '#07961f',
          text: '计算2',
          to: '/test-computerSaleRecords',
          hasShow: true,
        },
        {
          icon: 'hotel-o',
          color: '#07961f',
          text: '当日',
          to: '/test-currDay',
          hasShow: true,
        },
        {
          icon: 'hotel-o',
          color: '#07961f',
          text: '历史',
          to: '/test-history',
          hasShow: true,
        },
      ],
    }
  },
  computed: {
    allPremission() {
      let premissions = []
      this.menus.map(menu => {
        if (menu.hasPermission) {
          premissions.push(...menu.hasPermission)
        }
      })

      console.log('premissions=', premissions)
      return premissions
    },
  },
}
</script>

<style>
.t {
  color: #07961f;
}
</style>
