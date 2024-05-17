import {create} from 'zustand'


const UserState = create((set) => {
  return {
    user: null,
    removeUser: ()=> set((state) => ({user: null})),
    setUser: (newUser)=> set((state)=> ({user: newUser}))
  }
})


export default UserState

