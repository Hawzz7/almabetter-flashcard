import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "flashcard",
  initialState: {
    valuesOfCard: localStorage.getItem("valuesOfCard")
      ? JSON.parse(localStorage.getItem("valuesOfCard"))
      : [],
  },
  reducers: {
    setValuesOfCard(state, action) {
      state.valuesOfCard.push({
        card: action.payload,
      });
      localStorage.setItem("valuesOfCard", JSON.stringify(state.valuesOfCard));
    },

    delValuesOfCard(state, action) {
      // const groupIdToDelete = action.payload;

      const indexToRemove = state.valuesOfCard.findIndex(
        (item) => item.card.groupId === action.payload
      );
      // if (indexToRemove !== -1) {
      //     state.valuesOfCard = [
      //         ...state.valuesOfCard.slice(0, indexToRemove),
      //         ...state.valuesOfCard.slice(indexToRemove + 1)
      //     ]
      // }
      state.valuesOfCard.splice(indexToRemove, 1);

      localStorage.setItem("valuesOfCard", JSON.stringify(state.valuesOfCard));
    },
  },
});

export default Slice.reducer;

export const { setValuesOfCard, delValuesOfCard } = Slice.actions;
