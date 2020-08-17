<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="500px" min-width="360px">
      <div>
        <v-tabs show-arrows background-color="primary accent-4" icons-and-text dark grow>
          <v-tabs-slider color="deep-purple accent-4"></v-tabs-slider>
          <v-tab>
            <v-icon large>mdi-account</v-icon>
            <div class="caption py-1">Login</div>
          </v-tab>
          <v-tab-item>
            <v-progress-linear v-if="authenticating" indeterminate color="purple"></v-progress-linear>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="Username" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-alert dense v-if="loginError" type="error">{{errorMsg}}</v-alert>
                      <v-alert dense v-if="warning" type="warning">{{warning}}</v-alert>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12">
                      <v-btn x-large block :disabled="!valid"


                             color="primary" @click="validate"> Login </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'Login',
        methods: {
            async validate() {
                if (this.$refs.loginForm.validate()) {
                    this.authenticating = true
                    await new Promise(resolve => setTimeout(resolve, 1500))
                    try {
                        await this.$store.dispatch('authenticate', {
                            loginEmail: this.loginEmail,
                            loginPassword: this.loginPassword
                        })
                        await this.$router.push('/dashboard')
                    } catch (e) {
                        this.errorMsg = e.response.data.message
                        this.loginError = true
                    }finally {
                        this.authenticating = false
                    }
                }
            },
            reset() {
                this.$refs.form.reset();
            }
        },
        data: () => ({
            loginError: false,
            errorMsg: '',
            authenticating: false,
            dialog: true,
            valid: true,
            verify: "",
            loginPassword: "",
            loginEmail: "",
            loginEmailRules: [v => !!v || "Required"],
            show1: false,
            rules: {
                required: value => !!value || "Required."
            }
        }),
        computed: {
            ...mapState(['warning'])
        }
    };
</script>
