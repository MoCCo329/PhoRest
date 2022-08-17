import { createSlice } from '@reduxjs/toolkit'

export let userDetail = createSlice({
    name: 'userDetail',
    initialState: '',
    reducers: {
        setUserDetail (state, action) {
            return action.payload
        },
        setIsFollowing (state, action) {
            const copy = state
            if (action.payload===1) {
                copy.followerCount += 1
                copy.following = true
            } else if (action.payload===0) {
                copy.followerCount -= 1
                copy.following = false
            }
            return copy
        }
    }
})
export let { setUserDetail, setIsFollowing } = userDetail.actions

export let viewType = createSlice({
    name: 'viewType',
    initialState: 0,
    reducers: {
        setViewType (state, action) {
            return action.payload
        }
    }
})
export let { setViewType } = viewType.actions


export let postForKakao = createSlice({
    name: 'postForKakao',
    initialState: '',
    reducers: {
        setPostForKakao (state, action) {
            return action.payload
        }
    }
})
export let { setPostForKakao } = postForKakao.actions