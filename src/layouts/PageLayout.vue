<template>
    <div class="page-layout">
        <header class="page-header">
            <slot name="header"></slot>
        </header>
        
        <main class="page-content">
            <slot></slot>
        </main>

        <footer class="page-footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'PageLayout'
}
</script>

<style scoped>
.page-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.page-header {
    width: 100%;
}

.page-content {
    flex: 1;
    padding: 1rem;
}

.page-footer {
    width: 100%;
}
</style></footer></template>