<template>
  <div 
    class="activity-widget"
    :class="{ collapsed: isCollapsed, dragging: isDragging }"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    ref="widget"
  >
    <div 
      class="widget-header"
      @mousedown="startDrag"
      @dblclick="toggleCollapse"
    >
      <h3>Activity Log</h3>
      <div class="widget-controls">
        <button @click="toggleCollapse" class="control-button">
          {{ isCollapsed ? '▼' : '▲' }}
        </button>
      </div>
    </div>
    <div class="widget-content" v-show="!isCollapsed">
      <div class="activity-feed">
        <p>Recent activities will appear here</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityWidget',
  data() {
    return {
      isCollapsed: false,
      isDragging: false,
      position: {
        x: window.innerWidth - 450,
        y: 20
      },
      dragOffset: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    startDrag(e) {
      if (e.target.closest('.control-button')) return;
      
      this.isDragging = true;
      this.dragOffset = {
        x: e.clientX - this.position.x,
        y: e.clientY - this.position.y
      };

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    onDrag(e) {
      if (!this.isDragging) return;

      this.position = {
        x: Math.max(0, Math.min(window.innerWidth - this.$refs.widget.offsetWidth, e.clientX - this.dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - this.$refs.widget.offsetHeight, e.clientY - this.dragOffset.y))
      };
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    }
  }
}
</script>

<style scoped>
.activity-widget {
  position: fixed;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 400px;
  z-index: 1000;
}

.widget-header {
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px 8px 0 0;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.widget-header h3 {
  margin: 0;
  font-size: 1rem;
}

.control-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0 4px;
  font-size: 0.8rem;
}

.widget-content {
  padding: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.activity-widget.collapsed {
  width: auto;
}

.activity-widget.dragging {
  opacity: 0.8;
  cursor: move;
}

.activity-feed {
  font-size: 0.85rem;
  color: var(--text-dark);
}
</style>
