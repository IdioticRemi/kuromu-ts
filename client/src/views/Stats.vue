<template>
    <v-container>
        <v-alert type="error" v-if="error">{{ error }}</v-alert>
        <div v-for="info in stats"
             v-bind:key="info.name"
        >
            <StatsComponent v-bind:info="info"/>
            <br>
        </div>
    </v-container>
</template>

<script>
    import {ApplicationAPI} from "../api/applicationAPI";
    import StatsComponent from "../components/StatsComponent";

    export default {
        name: "Stats",
        components: {
            StatsComponent
        },
        data() {
            return {
                stats: [],
                error: ""
            }
        },
        async mounted() {
            try {
                this.stats = await ApplicationAPI.fetchApplication();
            } catch (e) {
                this.error = e.message;
            }
        }
    }
</script>

<style scoped>

</style>