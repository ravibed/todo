<template>
  <div class="bg-white border border-slate-200 rounded-2xl shadow-md shadow-slate-200/50 overflow-hidden hover:shadow-lg transition-shadow">
    <div class="px-5 pt-5 pb-2">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 class="m-0 text-base font-bold text-slate-800">Create issue</h3>
      </div>
      <p class="mt-2 text-slate-500 text-sm">Add a new task and assign it to a team member.</p>
    </div>
    <div class="px-5 pb-5">
      <form @submit.prevent="handleSubmit" class="grid gap-3">
        <!-- Task input -->
        <input
          v-model="newTask"
          type="text"
          placeholder="What needs to be done?"
          aria-label="New task"
          class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
        />

        <!-- Assignee + Submit row -->
        <div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              v-model="assignee"
              type="text"
              placeholder="Assigned to... (e.g., Ravi Bed)"
              aria-label="Assigned to"
              class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-800 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            :disabled="!newTask.trim()"
            class="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            + Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['add'])
const newTask = ref('')
const assignee = ref('')

const handleSubmit = () => {
  if (!newTask.value.trim()) return
  emit('add', {
    text: newTask.value,
    assignee: assignee.value.trim() || 'Unassigned'
  })
  newTask.value = ''
  assignee.value = ''
}
</script>