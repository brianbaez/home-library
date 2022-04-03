import React from "react";

import {FAQItems} from "./FAQItems";

function FAQ() {
  return (
    <div className="FAQ mt-5 pb-5">
      <div className="container text-center">
        <h2><strong>Frequently Asked Questions</strong></h2>
        <h3>Didn't find the answer to a question you were looking for? <strong>Contact us!</strong></h3>

        {FAQItems.map((item) => {
          return (
            <div key={item.id} className="pt-5">
              <h3><strong>{item.question}</strong></h3>
              <h3>{item.answer}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
