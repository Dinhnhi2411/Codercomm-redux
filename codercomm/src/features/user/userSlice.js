import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
    isLoading : false,
    error: null,
}

const slice = createSlice({
    name: "user",
    initialState,
    reducer: {},
});

export default slice.reducer