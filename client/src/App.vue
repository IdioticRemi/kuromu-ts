<template>
    <v-app>
        <v-app-bar
                app
                color="pink accent-1"
                dark
        >
            <div class="d-flex align-center">
                <h2>
                    Kuromu
                </h2>
            </div>

            <v-spacer/>

            <v-btn
                    v-bind:href="inviteURL"
                    target="blank"
                    text
            >
                <span class="mr-2">Login</span>
                <v-icon>mdi-fingerprint</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <RouterView/>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return  {
                inviteURL: "https://discordapp.com/oauth2/authorize?client_id=584053340384657438&permissions=8&scope=bot"
            }
        }
    };

</script>
