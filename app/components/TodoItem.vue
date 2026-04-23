<template>
  <li
    class="border rounded-xl p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
    :class="cardClass"
    draggable="true"
    @dragstart="$emit('drag-start', task)"
    @dragend="$emit('drag-end')"
  >
    <!-- EDIT MODE -->
    <div v-if="isEditing" class="grid gap-2">
      <textarea
        ref="editInput"
        v-model="editText"
        @keydown.ctrl.enter.prevent="saveEdit"
        @keydown.meta.enter.prevent="saveEdit"
        @keydown.esc="cancelEdit"
        placeholder="Task description"
        class="w-full px-2 py-1.5 text-sm rounded-lg border-2 border-indigo-400 focus:border-indigo-600 outline-none resize-none bg-white text-slate-800"
        rows="2"
      />
      <div class="relative">
        <svg class="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <input
          v-model="editAssignee"
          @keydown.enter.prevent="saveEdit"
          @keydown.esc="cancelEdit"
          type="text"
          placeholder="Assigned to..."
          class="w-full pl-7 pr-2 py-1.5 text-xs rounded-lg border-2 border-indigo-300 focus:border-indigo-600 outline-none bg-white text-slate-800"
        />
      </div>
      <div class="flex gap-1.5">
        <button
          @click="saveEdit"
          class="px-2.5 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md transition-all"
        >
          ✓ Save
        </button>
        <button
          @click="cancelEdit"
          class="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- VIEW MODE -->
    <div v-else>
      <div class="flex items-start justify-between gap-2">
        <p
          class="m-0 text-sm font-medium break-words flex-1"
          :class="textClass"
        >
          {{ task.text }}
        </p>
        <button
          @click="startEdit"
          class="flex-shrink-0 w-6 h-6 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/80 grid place-items-center transition-all"
          aria-label="Edit task"
        >
          <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      <!-- Status chip + Assignee -->
      <div class="mt-2.5 flex items-center justify-between gap-2 flex-wrap">
        <span
          class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
          :class="chipClass"
        >
          {{ chipLabel }}
        </span>

        <!-- Assignee badge -->
        <div class="flex items-center gap-1.5" :title="`Assigned to: ${task.assignee}`">
          <div
            class="w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white shadow-sm"
            :style="{ background: avatarColor }"
          >
            {{ initials }}
          </div>
          <span class="text-xs font-medium text-slate-600 truncate max-w-[100px]">
            {{ task.assignee || 'Unassigned' }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-1.5">
        <button
          v-for="action in moveActions"
          :key="action.status"
          @click="$emit('move', task.id, action.status)"
          class="px-2.5 py-1 text-xs font-medium rounded-md bg-white/80 backdrop-blur border border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all"
        >
          {{ action.label }}
        </button>
        <button
          @click="$emit('delete', task.id)"
          class="px-2.5 py-1 text-xs font-semibold rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors ml-auto"
        >
          🗑
        </button>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  task: { type: Object, required: true }
})

const emit = defineEmits(['move', 'delete', 'edit', 'drag-start', 'drag-end'])

// ============================================
// EDIT MODE
// ============================================

const isEditing = ref(false)
const editText = ref('')
const editAssignee = ref('')
const editInput = ref(null)

const startEdit = async () => {
  editText.value = props.task.text
  editAssignee.value = props.task.assignee === 'Unassigned' ? '' : (props.task.assignee || '')
  isEditing.value = true
  await nextTick()
  editInput.value?.focus()
}

const saveEdit = () => {
  if (editText.value.trim()) {
    emit('edit', props.task.id, {
      text: editText.value,
      assignee: editAssignee.value
    })
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

// ============================================
// ASSIGNEE AVATAR
// ============================================

// Get initials from name (e.g., "John Doe" -> "JD")
const initials = computed(() => {
  const name = props.task.assignee || 'U'
  if (name === 'Unassigned') return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Generate a consistent color from the name
const avatarColor = computed(() => {
  const name = props.task.assignee || ''
  if (!name || name === 'Unassigned') {
    return 'linear-gradient(135deg, #94a3b8, #64748b)'
  }
  
  const colors = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',  // indigo-purple
    'linear-gradient(135deg, #ec4899, #f43f5e)',  // pink-rose
    'linear-gradient(135deg, #f59e0b, #ef4444)',  // amber-red
    'linear-gradient(135deg, #10b981, #059669)',  // emerald
    'linear-gradient(135deg, #0ea5e9, #2563eb)',  // sky-blue
    'linear-gradient(135deg, #8b5cf6, #d946ef)',  // violet-fuchsia
    'linear-gradient(135deg, #14b8a6, #0891b2)',  // teal-cyan
    'linear-gradient(135deg, #f97316, #ea580c)',  // orange
  ]
  
  // Hash the name to pick a consistent color
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
})

// ============================================
// CARD STYLING BY STATUS
// ============================================

const cardClass = computed(() => {
  if (props.task.status === 'todo') {
    return 'bg-white border-slate-200 hover:border-blue-300'
  }
  if (props.task.status === 'progress') {
    return 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:border-amber-300'
  }
  return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
})

const textClass = computed(() => {
  if (props.task.status === 'done') return 'line-through text-green-700/70'
  if (props.task.status === 'progress') return 'text-amber-900'
  return 'text-slate-800'
})

const chipClass = computed(() => {
  if (props.task.status === 'todo') return 'bg-blue-100 text-blue-700'
  if (props.task.status === 'progress') return 'bg-amber-200 text-amber-800'
  return 'bg-green-200 text-green-800'
})

const chipLabel = computed(() => {
  if (props.task.status === 'todo') return '○ To do'
  if (props.task.status === 'progress') return '◐ In progress'
  return '✓ Done'
})

const moveActions = computed(() => {
  if (props.task.status === 'todo') {
    return [
      { status: 'progress', label: '→ Progress' },
      { status: 'done', label: '✓ Done' }
    ]
  }
  if (props.task.status === 'progress') {
    return [
      { status: 'todo', label: '← To Do' },
      { status: 'done', label: '✓ Done' }
    ]
  }
  return [
    { status: 'todo', label: '↺ Reopen' },
    { status: 'progress', label: '→ Progress' }
  ]
})
</script>