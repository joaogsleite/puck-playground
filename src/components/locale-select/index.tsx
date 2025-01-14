import { allLocales } from '@/services/locale'
import { useRoutingCtx } from '../routing-ctx/client'
import { AutoField } from '@measured/puck'
import styles from './style.module.css'

export default function LocaleSelect() {
  const [ctx, setCtx] = useRoutingCtx()
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