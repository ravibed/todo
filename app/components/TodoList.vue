<template>
  <div class="bg-white border border-slate-200 rounded-2xl shadow-md shadow-slate-200/50 overflow-hidden">
    <!-- Board header -->
    <div class="px-5 pt-5 pb-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
      <div class="flex justify-between items-start gap-3 flex-wrap">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 grid place-items-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <h3 class="m-0 text-base font-bold text-slate-800">Kanban board</h3>
            <p class="mt-0.5 text-slate-500 text-xs">
              Drag a card and drop it into another column.
            </p>
          </div>
        </div>
        <button
          type="button"
          @click="$emit('clear-done')"
          :disabled="done.length === 0"
          class="px-4 py-2 rounded-lg font-semibold text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          🗑 Clear done
        </button>
      </div>
    </div>

    <!-- 3 columns -->
    <div class="p-4 sm:p-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- TO DO COLUMN (WHITE/BLUE) -->
        <div>
          <div class="flex justify-between items-center mb-3 px-1">
            <div class="flex items-center gap-2 font-bold text-sm text-slate-800">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              To Do
            </div>
            <span class="text-xs text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full font-bold">
              {{ todo.length }}
            </span>
          </div>
          <div
            class="bg-slate-50 rounded-xl p-3 min-h-[240px] transition-all border-2 border-dashed border-transparent"
            :class="{ 'bg-blue-50 border-blue-400 scale-[1.01]': dragOverColumn === 'todo' }"
            @dragover.prevent="$emit('drag-over', 'todo')"
            @dragleave="$emit('drag-leave', 'todo')"
            @drop="$emit('drop', 'todo')"
          >
            <TransitionGroup name="fade" tag="ul" class="list-none p-0 m-0 grid gap-2" v-if="todo.length">
              <TodoItem
                v-for="t in todo"
                :key="t.id"
                :task="t"
                @move="(id, status) => $emit('move', id, status)"
                @delete="(id) => $emit('delete', id)"
                @edit="(id, text) => $emit('edit', id, text)"
                @drag-start="(task) => $emit('drag-start', task)"
                @drag-end="$emit('drag-end')"
              />
            </TransitionGroup>
            <div v-else class="text-center text-slate-400 text-sm py-10">
              <div class="text-3xl mb-2">📋</div>
              No tasks in To Do.
            </div>
          </div>
        </div>

        <!-- IN PROGRESS COLUMN (YELLOW) -->
        <div>
          <div class="flex justify-between items-center mb-3 px-1">
            <div class="flex items-center gap-2 font-bold text-sm text-slate-800">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              In Progress
            </div>
            <span class="text-xs text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold">
              {{ progress.length }}
            </span>
          </div>
          <div
            class="bg-gradient-to-b from-yellow-50 to-amber-50/50 rounded-xl p-3 min-h-[240px] transition-all border-2 border-dashed border-transparent"
            :class="{ 'from-yellow-100 to-amber-100 border-amber-400 scale-[1.01]': dragOverColumn === 'progress' }"
            @dragover.prevent="$emit('drag-over', 'progress')"
            @dragleave="$emit('drag-leave', 'progress')"
            @drop="$emit('drop', 'progress')"
          >
            <TransitionGroup name="fade" tag="ul" class="list-none p-0 m-0 grid gap-2" v-if="progress.length">
              <TodoItem
                v-for="t in progress"
                :key="t.id"
                :task="t"
                @move="(id, status) => $emit('move', id, status)"
                @delete="(id) => $emit('delete', id)"
                @edit="(id, text) => $emit('edit', id, text)"
                @drag-start="(task) => $emit('drag-start', task)"
                @drag-end="$emit('drag-end')"
              />
            </TransitionGroup>
            <div v-else class="text-center text-amber-600/60 text-sm py-10">
              <div class="text-3xl mb-2">⚡</div>
              No tasks in progress.
            </div>
          </div>
        </div>

        <!-- DONE COLUMN (GREEN) -->
        <div>
          <div class="flex justify-between items-center mb-3 px-1">
            <div class="flex items-center gap-2 font-bold text-sm text-slate-800">
              <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              Done
            </div>
            <span class="text-xs text-green-800 bg-green-100 px-2.5 py-0.5 rounded-full font-bold">
              {{ done.length }}
            </span>
          </div>
          <div
            class="bg-gradient-to-b from-green-50 to-emerald-50/50 rounded-xl p-3 min-h-[240px] transition-all border-2 border-dashed border-transparent"
            :class="{ 'from-green-100 to-emerald-100 border-green-400 scale-[1.01]': dragOverColumn === 'done' }"
            @dragover.prevent="$emit('drag-over', 'done')"
            @dragleave="$emit('drag-leave', 'done')"
            @drop="$emit('drop', 'done')"
          >
            <TransitionGroup name="fade" tag="ul" class="list-none p-0 m-0 grid gap-2" v-if="done.length">
              <TodoItem
                v-for="t in done"
                :key="t.id"
                :task="t"
                @move="(id, status) => $emit('move', id, status)"
                @delete="(id) => $emit('delete', id)"
                @edit="(id, text) => $emit('edit', id, text)"
                @drag-start="(task) => $emit('drag-start', task)"
                @drag-end="$emit('drag-end')"
              />
            </TransitionGroup>
            <div v-else class="text-center text-green-600/60 text-sm py-10">
              <div class="text-3xl mb-2">🎉</div>
              No completed tasks yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todo: { type: Array, default: () => [] },
  progress: { type: Array, default: () => [] },
  done: { type: Array, default: () => [] },
  dragOverColumn: { type: String, default: null }
})

defineEmits([
  'move',
  'delete',
  'edit',
  'clear-done',
  'drag-start',
  'drag-over',
  'drag-leave',
  'drag-end',
  'drop'
])
</script>