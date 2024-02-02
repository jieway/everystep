<script setup lang="ts">
import { VPDocAsideSponsors } from 'vitepress/theme'

const data = [
  {
    items: [{ img: '/public/weixin/white.png' }]
  },
]
</script>

<template>
  <!-- <div class="sponsor-section">
    <div class="sponsor-description">
      扫码关注公众号「<span class="highlight">everystep</span>」回复666即可获取2024版的 C++ 八股 pdf。
    </div>
    <VPDocAsideSponsors :data="data" />
  </div> -->
</template>

<style>
.vp-sponsor-grid.medium .vp-sponsor-grid-image img {
  width: 100%; /* 图片宽度填满容器 */
  height: auto; /* 自动调整高度以保持宽高比 */
  object-fit: cover; /* 图片覆盖整个容器 */
}

.sponsor-description {
  font-size: 12px; /* 减小字体大小 */
  /* 可以根据需要进一步调整 */
}

.highlight {
  color: red; /* 设置红色字体 */
}
</style>
