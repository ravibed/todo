<template>
  <div class="grid grid-cols-3 gap-3">
    <!-- To Do: Blue/White -->
    <div class="bg-white border border-blue-100 rounded-2xl shadow-md shadow-blue-100/50 p-4 relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -mr-10 -mt-10"></div>
      <div class="relative">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-blue-500"></span>
          <div class="text-xs text-slate-600 font-semibold uppercase tracking-wide">To Do</div>
        </div>
        <div class="mt-2 text-3xl font-extrabold text-slate-800">{{ todoCount }}</div>
      </div>
    </div>

    <!-- In Progress: Yellow -->
    <div class="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl shadow-md shadow-yellow-100/50 p-4 relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div class="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full -mr-10 -mt-10"></div>
      <div class="relative">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <div class="text-xs text-amber-700 font-semibold uppercase tracking-wide">In Progress</div>
        </div>
        <div class="mt-2 text-3xl font-extrabold text-amber-900">{{ progressCount }}</div>
      </div>
    </div>

    <!-- Done: Green -->
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-md shadow-green-100/50 p-4 relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
      <div class="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full -mr-10 -mt-10"></div>
      <div class="relative">
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          <div class="text-xs text-green-700 font-semibold uppercase tracking-wide">Done</div>
        </div>
        <div class="mt-2 text-3xl font-extrabold text-green-900">{{ doneCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todoCount: { type: Number, default: 0 },
  progressCount: { type: Number, default: 0 },
  doneCount: { type: Number, default: 0 }
})
</script>