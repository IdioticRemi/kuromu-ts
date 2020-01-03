<template>
    <v-app-bar app color="pink accent-1" dark>
        <div class="d-flex align-center">
            <v-img
                v-bind:src="avatarURL"
                style="border-radius: 10px"
                width="40px"
            />

            <v-btn text to="/" class="ms-2">
                <span>Kuromu</span>
            </v-btn>
            <v-btn text to="/stats" class="ms-2">
                <span>Stats</span>
            </v-btn>
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
                inviteURL: "https://discordapp.com/oauth2/authorize?client_id=584053340384657438&permissions=8&scope=bot",
                avatarURL: "https://cdn.discordapp.com/avatars/584053340384657438/eba599abe5049089cdd6ffddefa9facc.webp"
            }
        }
    }
</script>

<style scoped>

</style>