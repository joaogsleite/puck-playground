import { allLocales } from '@/services/locale'
import { AutoField } from '@measured/puck'
import styles from './style.module.css'
import { usePuckPageCtx } from '@/services/puck'

export default function LocaleSelect() {
  const [ctx, setCtx] = usePuckPageCtx()
  const options = allLocales.map((locale) => ({ 
    label: locale.toUpperCase(),
    value: locale,
  }))
  return (
    <div className={styles.localeSelect}>
      <AutoField
        field={{ type: 'select', options }}
        value={ctx?.locale}
        onChange={(locale) => setCtx({locale})}
      />
    </div>
  )
}