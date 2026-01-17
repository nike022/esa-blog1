<template>
  <div class="pagination">
    <button
      class="pagination-btn"
      :disabled="currentPage === 1"
      @click="$emit('change', currentPage - 1)"
    >
      ‹ 上一页
    </button>

    <div class="pagination-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="pagination-number"
        :class="{ active: page === currentPage }"
        @click="$emit('change', page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="pagination-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('change', currentPage + 1)"
    >
      下一页 ›
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

defineEmits(['change'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 48px;
}

.pagination-btn,
.pagination-number {
  padding: 10px 16px;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled),
.pagination-number:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-number.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.pagination-numbers {
  display: flex;
  gap: 8px;
}

@media (max-width: 768px) {
  .pagination {
    gap: 8px;
  }

  .pagination-btn,
  .pagination-number {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>
