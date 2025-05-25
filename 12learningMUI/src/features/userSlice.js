import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const user = {
                id: nanoid(),
                username: action.payload.username,
                password: action.payload.password
            }
            state.users.push(user)
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        loginUser: (state, action) => {
            const users = JSON.parse(localStorage.getItem('users')) || [];


            const user = users.find(
                u => u.username === action.payload.username && u.password === action.payload.password
            );

            if (user) {
                state.isLoggedIn = true
                localStorage.setItem('isLoggedIn', String(true))
            }

        }
    }
})

export const { registerUser, loginUser } = userSlice.actions;

export default userSlice.reducer;
