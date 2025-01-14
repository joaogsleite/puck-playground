import { useProduct } from "@/services/data/products"
import styles from './style.module.css'

export default function ProductInfo({ id }: { id?: number }) {
  const product = useProduct(id)
  return product?.id ? (
    <div style={{padding: '0 64px'}}>
      <h2>Product info</h2>
      <dl className={styles.detail}>
        <dt>Name</dt>
        <dd>{product.name}</dd>
      </dl>
      <dl  className={styles.detail}>
        <dt>Description</dt>
        <dd>{product.description}</dd>
      </dl>
      <dl className={styles.detail}>
        <dt>Price</dt>
        <dd>{product.price}</dd>
      </dl>
    </div>
  ) : null
}
