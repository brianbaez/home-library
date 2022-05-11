import React from "react";

// Components
import Icon from "./Icon";
import {featureItems} from "./FeatureItems";

function Features() {
  return (
    <div className="Features mt-5 pt-5">
      <div className="container text-center">
        <h2 className="mb-5">See What Else Your <strong>HomeLibrary</strong> Has to Offer</h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {featureItems.map((item) => {
            return (
              <div key={item.id} className="col pb-5">
                <Icon icon={item.logo} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Features;
