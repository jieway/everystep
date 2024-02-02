<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useRoute } from 'vitepress'

const DEV = inject('DEV') as Ref<boolean>
const route = useRoute()

const pageId = computed(() => route.path.replace('/everystep', ''))
</script>

<template>

  <div class="copyright">
    <div class="copyright-text">
      <span>
        Copyright © 2019 - 2023
        <a href="https://github.com/weijiew" target="_blank">©weijiew</a>.
      </span>
      <br>
      Released under the CC BY-NC-SA 4.0 International License.
    </div>
  </div>

</template>

<style scoped>

.visitor {
  display: block;
  margin: 0 auto 16px; /* 居中显示并添加一些下方空间 */
}

/* 用于调整版权文本的样式 */
.copyright-text {
  text-align: center; /* 居中文本 */
  margin-top: 16px; /* 根据需要调整间距 */
}

/* 调整超链接的样式 */
a {
  color: #007bff; /* 为链接设置颜色 */
  text-decoration: none; /* 可选：移除下划线 */
}

/* 鼠标悬停时超链接的样式 */
a:hover {
  text-decoration: underline; /* 鼠标悬停时添加下划线 */
}

</style>
