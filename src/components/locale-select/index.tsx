import { allLocales } from '@/services/locale'
import { useLocale } from '../locale-ctx/client'
import { AutoField } from '@measured/puck'
import styles from './style.module.css'

export default function LocaleSelect() {
  const [locale, setLocale] = useLocale()
  const options = allLocales.map((locale) => ({ 
    label: locale.toUpperCase(),
    value: locale,
  }))
  return (
    <div className={styles.localeSelect}>
      <AutoField
        field={{ type: 'select', options }}
        value={locale}
        onChange={(value) => setLocale(value)}
      />
    </div>
  )
}