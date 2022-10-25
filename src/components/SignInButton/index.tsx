import {signIn, signOut, useSession} from 'next-auth/client'
import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'



export default function SignInButton() {

    const [session] = useSession()
    console.log('session')


    return session ? (
        <button type='button' className={styles.SignInButton} onClick={() => signOut()}>
            <img src={session.user.image}alt="foto do usuario" />
            Olá {session.user.name}
       
           <FiX color='#737388' className={styles.closeIcon} />
           
        </button>
    ) : (    
        <button type='button' className={styles.SignInButton} onClick={() => signIn('github')}>

        <FaGithub color='#FFB800' />
        Entrar com o github
       </button> 
    )
}