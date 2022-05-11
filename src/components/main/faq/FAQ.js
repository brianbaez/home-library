import React from "react";

// Components
import {FAQItems} from "./FAQItems";

function FAQ() {
  return (
    <div className="FAQ mt-5 pb-5">
      <div className="container text-center">
        <h2 className="pb-3"><strong>Frequently Asked Questions</strong></h2>

        {FAQItems.map((item) => {
          return (
            <div key={item.id} className="pb-4">
              <h3><strong>{item.question}</strong></h3>
              <p>{item.answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
