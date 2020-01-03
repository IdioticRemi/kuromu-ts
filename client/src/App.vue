<template>
    <v-app>
        <AppBarComponent/>

        <v-content>
            <v-container>
                <RouterView/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import AppBarComponent from "./components/AppBarComponent";

    export default {
        name: 'App',
        components: {
            AppBarComponent
        },
        created () {
            this.$vuetify.theme.dark = true
        },
    };

</script>
