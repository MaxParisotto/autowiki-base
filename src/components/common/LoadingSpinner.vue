<template>
    <div class="loading-spinner" :class="{ 'is-overlay': overlay }">
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
    props: {
        overlay: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.is-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
}

.spinner {
    text-align: center;
}

.spinner > div {
    width: 12px;
    height: 12px;
    background-color: #333;
    border-radius: 100%;
    display: inline-block;
    margin: 0 2px;
    animation: bounce 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
    animation-delay: -0.32s;
}

.spinner .bounce2 {
    animation-delay: -0.16s;
}

@keyframes bounce {
    0%, 80%, 100% { 
        transform: scale(0);
    }
    40% { 
        transform: scale(1.0);
    }
}
</style></div>