import { createSlice } from '@reduxjs/toolkit'

export let userDetail = createSlice({
    name: 'userDetail',
    initialState: '',
    reducers: {
        setUserDetail (state, actions) {
            return actions.payload
        },
    }
})
export let { setUserDetail } = userDetail.actions