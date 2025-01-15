import { IMultilangField, MultilangField, multilangFieldConfig } from '@/components/multilang-field'
import { ComponentConfig } from '@measured/puck'

export interface IParagraphBlock {
  copy: IMultilangField<string>
}

export const ParagraphBlock: ComponentConfig<IParagraphBlock> = {
  resolveFields: () => ({
    copy: multilangFieldConfig({ type: 'text', label: 'Copy' }),
  }),
  defaultProps: {
    copy: { en: 'Hello world', pt: 'Olá mundo', fr: 'Bonjour le monde' },
  },
  render: ({ copy }) => (
    <p style={{padding: '10px 64px'}}>
      <MultilangField field={copy} />
    </p>
  ),
}