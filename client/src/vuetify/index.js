import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)

/* DEVNOTE: vuetify does not currently support vue 3 and the roadmap involves a complete rebuild to be compatible, scheduled for Q3 2021.
 In addition. Vuetify has evolved and transitioned to v2.x. At some point they decided to deprecate pre-defined layouts. The last release to feature this was 2.3.10 */
