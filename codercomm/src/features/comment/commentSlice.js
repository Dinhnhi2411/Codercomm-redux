import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
    isLoading : false,
    error: null,
}

const slice = createSlice({
    name: "comment",
    initialState,
    reducer: {},
});

export default slice.reducer