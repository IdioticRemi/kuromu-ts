<template>
    <v-app-bar app color="pink accent-1" dark>
        <div class="d-flex align-center">
            <h2>
                Kuromu
            </h2>
        </div>

        <v-spacer/>

        <v-btn
                target="blank"
                text
                v-bind:href="inviteURL"
        >
            <v-icon>mdi-fingerprint</v-icon>
            <span class="mr-2">Login</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "AppBarComponent",
        data() {
            return {
                inviteURL: "https://discordapp.com/oauth2/authorize?client_id=584053340384657438&permissions=8&scope=bot"
            }
        }
    }
</script>

<style scoped>

</style>