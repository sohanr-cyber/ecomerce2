import React, { useState } from 'react'
import styles from '../../styles/Login.module.css'
import Logo from '@/components/Utility/Logo'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/redux/userSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { NextSeo } from 'next-seo'
import { loginSeoData } from '@/utility/const'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const Reset = () => {
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()

  const resetPassword = async () => {
    if (!code || !newPassword) {
      dispatch(
        showSnackBar({
          message: 'Please Type The Code and New Password!',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    if (code.length != 6) {
      dispatch(
        showSnackBar({
          message: 'Code must be of 6 Characters',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }

    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/user/verify/reset', {
        code,
        newPassword
      })

      if (data.error) {
        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'error'
            }
          })
        )
      }

      if (data && !data.error) {
        console.log(data)
        dispatch(
          showSnackBar({
            message: 'Password Reset !',
            option: {
              variant: 'success'
            }
          })
        )
        router.push('/login')
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo {...loginSeoData} />
      <div className={styles.wrapper}>
        <div className={styles.form__container}>
          {' '}
          <div className={styles.logo}>
            <Logo />
          </div>
          <h2>Set New Password</h2>
          <form>
            <input
              type='text'
              placeholder='Enter The Verification Code'
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <input
              type='text'
              placeholder='Enter Your New Password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />

            <div className={styles.btn} onClick={() => resetPassword()}>
              Submit
            </div>
          </form>
          <p className={styles.route}>
            Don&apos;t have an account ?{' '}
            <Link href='/register'>&nbsp;create new account</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Reset
