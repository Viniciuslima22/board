import styles from './styles.module.scss'
import Link from 'next/link'

export default function SupportButton(){
    return(
        <div className={styles.container}>
      <Link href="/donate">
        <button>APOIAR</button>
      </Link>
        </div>
       
    )
}