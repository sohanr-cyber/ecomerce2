import React, { use } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Utility/Pagination.module.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const Pages = ({ totalPages, currentPage }) => {
  const router = useRouter()
  const updateRoute = data => {
    const queryParams = { ...router.query, ...data }
    router.push({
      pathname: router.pathname,
      query: queryParams,
      shallow: false
    })
  }

  return (
    <div className={styles.flex}>
      <Stack spacing={2}>
        <Pagination
          count={parseInt(totalPages)}
          shape='rounded'
          color='primary'
          page={parseInt(router.query.page)}
          onChange={(event, newPage) => updateRoute({ page: newPage })}
        />
      </Stack>
    </div>
  )
}

export default Pages
