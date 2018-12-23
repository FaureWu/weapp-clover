import { createMixin } from '@opcjs/zoro-plugin'

import common from './common'
import pagination from './pagination'

export default [common, pagination].map(mixin => createMixin(mixin))
