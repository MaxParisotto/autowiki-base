<template>
    <span
        class="status-badge"
        :class="statusClass"
    >
        {{ label }}
    </span>
</template>

<script>
export default {
    name: 'StatusBadge',
    props: {
        status: {
            type: String,
            required: true,
            validator: (value) => ['success', 'warning', 'error', 'info', 'pending'].includes(value)
        },
        label: {
            type: String,
            required: true
        }
    },
    computed: {
        statusClass() {
            return `status-badge--${this.status}`
        }
    }
}
</script>

<style scoped>
.status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge--success {
    background-color: #e6f4ea;
    color: #1e8e3e;
}

.status-badge--warning {
    background-color: #fef7e0;
    color: #f2994a;
}

.status-badge--error {
    background-color: #fce8e6;
    color: #d93025;
}

.status-badge--info {
    background-color: #e8f0fe;
    color: #1a73e8;
}

.status-badge--pending {
    background-color: #f1f3f4;
    color: #5f6368;
}
</style>