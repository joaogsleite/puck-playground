import { useProduct } from "@/services/data/products"
import styles from './style.module.css'
import { useRoutingCtx } from "../routing-ctx"
import { useTranslations } from "@/services/data/translations"


export default function ProductInfo({ size = 'small' }: { size?: 'small' | 'large' }) {
  const ctx = useRoutingCtx()
  const product = useProduct(ctx.id)
  const t = useTranslations(ctx.locale)
  return product?.id ? (
    <div className={`${styles.productInfo} ${size === 'large' ? styles.sizeLarge : styles.sizeSmall}`}>
      <h2>{t.title}</h2>
      <dl className={styles.detail}>
        <dt>{t.name}</dt>
        <dd>{product.name}</dd>
      </dl>
      <dl  className={styles.detail}>
        <dt>{t.description}</dt>
        <dd>{product.description}</dd>
      </dl>
      <dl className={styles.detail}>
        <dt>{t.price}</dt>
        <dd>{product.price}</dd>
      </dl>
    </div>
  ) : null
}
