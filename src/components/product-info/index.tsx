import { useProduct } from "@/services/data/products"
import styles from './style.module.css'
import { useRoutingCtx } from "../routing-ctx"
import { useTranslations } from "@/services/translations"


export default function ProductInfo() {
  const [ctx] = useRoutingCtx()
  const product = useProduct(ctx.id)
  const t = useTranslations(ctx.locale)
  return product?.id ? (
    <div style={{padding: '0 64px'}}>
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
