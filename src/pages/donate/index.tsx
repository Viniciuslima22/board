import Head from "next/head";
import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import { getSession } from "next-auth/client";

import { useState } from 'react'

import firebase from "../../services/firebaseConnection";

import { PayPalButtons } from '@paypal/react-paypal-js'
//AXj75mDLwwp1Ir1E2QBdlA5nOXq50y7Jnb6DWoaA3TtSVfurbGinPp0IkS-P1jT_vi_Ge0xKJHGHlq94
//sb-m7zig21698850@business.example.com
//<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProps {
    user: {
        nome: string
        id: string
        image: string
    }
}

export default function Donate({ user }: DonateProps) {

    const [vip, setVip] = useState(false)

    async function saveDonats() {
        await firebase.firestore().collection('users').doc(user.id)
            .set({
                donate: true,
                lastDonate: new Date(),
                image: user.image
            })
            .then(() => {
                setVip(true)
            })


    }

    return (
        <>
            <Head>
                <title>Ajude a Pagina</title>
            </Head>

            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="Imagem Apoiador" />
                {vip && (
                    <div className={styles.vip}>
                        <img src={user.image} alt="" />
                        <span>Parabéns você é um novo apoiador!</span>
                    </div>
                    )
                }

                <h1>Seja um apoiador deste projeto 🏆</h1>
                <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                <strong>Apareça na nossa home, tenha funcionalidades exclusivas</strong>

                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{ amount: { value: '1' } }]
                        })
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            console.log('Compra aprovada: ' + details.payer.name.given_name)
                            saveDonats()

                        })
                    }} />
            </main>
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        nome: session?.user.name,
        id: session?.id,
        image: session?.user.image
    }

    return {
        props: {
            user


        }
    }
}
