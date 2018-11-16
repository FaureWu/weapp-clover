import { createMixin } from '@opcjs/zoro-plugin'

import common from './common'

export default [common].map(mixin => createMixin(mixin))
