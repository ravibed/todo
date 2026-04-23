<template>
  <header class="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-4 sm:px-8 py-4 flex justify-between items-center gap-4 shadow-sm">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 grid place-items-center shadow-lg shadow-indigo-500/30">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <div>
        <h2 class="m-0 text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Workspace Board
        </h2>
        <p class="mt-0.5 text-slate-500 text-xs sm:text-sm hidden sm:block">
          Drag tasks across To Do, In Progress, and Done columns.
        </p>
      </div>
    </div>
    <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center font-bold text-sm shadow-lg shadow-indigo-500/30 ring-2 ring-white">
      RB
    </div>
  </header>
</template>