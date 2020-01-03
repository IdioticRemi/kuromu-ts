<template>
    <v-card raised dark>
        <v-card-title>{{ info.name }}</v-card-title>
        <v-card-text>{{ info.value }}</v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "StatsComponent",
        props: [
            'info'
        ]
    }
</script>

<style scoped>

</style>