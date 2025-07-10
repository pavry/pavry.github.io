<script setup>
import { ref, onMounted } from 'vue';

const commit = ref(null);

onMounted(async () => {
  await fetch('https://api.github.com/repos/pavry/pavry.github.io/commits')
    .then(response => response.json())
    .then(data => {
      commit.value = data[0]
    })
    .catch(() => {
      return;
    });
})
</script>

<template>
  <div class="flex justify-between mt-10 gap-5 text-sm text-gruvbox-gray">
    <div class="flex gap-2">
      <font-awesome-icon :icon="['fas', 'code-branch']" class="mt-[3px]" />
      <div v-if="commit">{{ commit.sha.slice(0, 7) }} — {{ commit.commit.message }}</div>
      <div v-else>latest commit could not be retrieved.</div>
    </div>
        <a href="https://github.com/pavry/" target="_blank"><font-awesome-icon :icon="['fab', 'github']" /></a>
  </div>
</template>

