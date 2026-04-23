<template>
  <NuxtPage />
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
  color: #172b4d;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}
.fade-move {
  transition: transform 0.35s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>