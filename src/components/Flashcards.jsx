import React from "react";
import CardStructure from "./CardStructure";
import { useSelector } from "react-redux";

const Flashcards = () => {
  const data = useSelector((state) => {
    return state.cards.valuesOfCard;
  });

  return (
    //flex flex-wrap gap-2 w-full items-center justify-center h-fit sm:w-[635px] md:w-[740px] lg:w-[900px]
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:w-[635px] md:w-[740px] lg:w-[900px]">
        {data.length > 0 && (
          <>
            {data.map((item, index) => {
              return (
                <div key={item.card.groupId}>
                  <CardStructure cardData={item} />
                </div>
              );
            })}
          </>
        )}
        {data.length < 1 && (
          <div className="text-2xl italic font-bold text-transparent bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500 bg-clip-text stroke-black">
            Create a card to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
