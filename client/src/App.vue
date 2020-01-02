<template>
    <v-app>
        <AppBarComponent/>

        <v-content>
            <RouterView/>
        </v-content>
    </v-app>
</template>

<script>
    import AppBarComponent from "./components/AppBarComponent";

    export default {
        name: 'App',
        components: {
            AppBarComponent
        }
    };

</script>
