//This component will show the cards that has been created with some info. To get all the details we will click on view card.

import React from "react";
import grey from "../assets/Grey.jpg";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { delValuesOfCard } from "../store/Slice";
import { useDispatch } from "react-redux";

const CardStructure = ({ cardData }) => {
  
  //dispacth action of redux store
  const dispatch = useDispatch();

  //getting the id's from cardData parameter
  const id = cardData.card.groupId

  //action for deleting the card from the store 
  const deleteCard = () => {
    //The dispatch action named "delValuesOfCard" which will delete the selected card from the store
    dispatch(delValuesOfCard(cardData.card.groupId));
  };


  return (
    <div

      key={cardData.id}
      className="flex flex-col p-4 ring-2 ring-red-600 h-[190px] w-[250px] bg-yellow-300 shadow-lg rounded-md space-y-4"
    >
      <div className="flex gap-5">
      {/* Will show the group image */}
        <img
          src={cardData.card.image}
          alt={grey}
          className=" h-[55px] w-[55px] rounded-[100px]"
        />
        <div className="flex flex-col py-2">
          {/* Will show the group name */}
          <div className="text-[15px] font-bold">{cardData.card.groupName}</div>

          <div className="flex  gap-2 text-slate-700 font-semibold text-[13px]">
            {/* Will show the number of terms that has been created */}
            {cardData.card.array.length}{" "}
            {cardData.card.array.length > 1 ? <p>cards</p> : <p>card</p>}
          </div>
        </div>
      </div>

      {/* will show the group description */}
      <div className="text-xs truncate">{cardData.card.groupDescription}</div>

      <div className="flex justify-between">
        {/* This button will give all the info about the particular card that you have selected */}
        <Link
        to={`/flashcardinfo/${cardData.card.groupId}`}
          className="text-sm font-semibold text-red-600 rounded-[5px] hover:scale-110 duration-300 active:text-blue-400
              "
        >
          View Card
          <ArrowRightAltIcon />
        </Link>

        {/* this button will delete particular card the card */}
        <button
          className="duration-300 text-slate-500 hover:scale-125 active:text-red-600 "
          onClick={deleteCard}
        >
          <DeleteSweepIcon />
        </button>
      </div>
    </div>
  );
};

export default CardStructure;
