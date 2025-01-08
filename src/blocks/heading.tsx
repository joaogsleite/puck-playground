import { IMultilangField, MultilangField, multilangFieldConfig } from '@/components/multilang-field'
import { ComponentConfig } from '@measured/puck'

export interface IHeadingBlock {
  title: IMultilangField<string>
}

export const HeadingBlock: ComponentConfig<IHeadingBlock> = {
  resolveFields: () => ({
    title: multilangFieldConfig({ type: 'text', label: 'Title' }),
  }),
  defaultProps: {
    title: { en: 'Title' }
  },
  render: ({ title }) => (
    <div style={{ padding: 64 }}>
      <h1><MultilangField field={title} /></h1>
    </div>
  ),
}