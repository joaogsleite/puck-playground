import type { Config } from '@measured/puck'
import { blocks, IBlocks } from '@/blocks'

const config: Config<IBlocks> = {
  components: blocks,
}

export default config
