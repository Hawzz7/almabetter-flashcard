import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";

const store = configureStore({
    reducer: {
        cards: Slice
    },
});

export default store;