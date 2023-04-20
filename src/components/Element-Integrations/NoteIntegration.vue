<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        element: Object,
    },
    components: {
        
    },
    watch: {
        
    },
    mount: {
        
    },
    methods: {
        
    }
}
</script>

<template>

    <div id="viewContainer" v-if="element.type === 'view'">

    </div>

    <div id="addContainer" v-if="element.type === 'add'">

    </div>

    <div id="editContainer" v-if="element.type === 'add'">

    </div>

</template>

<style scoped>
    @import '../../assets/elements.css';
</style>