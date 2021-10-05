import React from "react";
import { Card } from "react-bootstrap";

import vietnam from "../../assets/vietnam.png";
import usa from "../../assets/usa.png";
import china from "../../assets/china.png";

const addressPerCountry = [
  {
    name: "Vietnam Store",
    flag: <img src={vietnam} alt="" />,
    address: "183, Nguyen Van Tang Street, Long Thanh My Ward, Thu Duc City",
  },
  {
    name: "United States Store",
    flag: <img src={usa} alt="" />,
    address: "16945 Leslie Street, Unit 25Newmarket, ONL3Y 9A2",
  },
  {
    name: "China Store",
    flag: <img src={china} alt="" />,
    address:
      "South Section of Cangre Road, Chengguan District, Lhasa City, Tibet Autonomous Region",
  },
];

const Address = () => {
  return (
    <div className="contact-address">
      <h1 className="animate__animated animate__fadeInUp">Location</h1>
      <div className="contact-address-info">
        {addressPerCountry.map((item, index) => (
          <Card
            className={`contact-card animate__animated animate__fadeInUp animated${
              index + 1
            }`}
            key={index}
          >
            <Card.Body>
              <div>{item.flag}</div>
              <Card.Title className="card-title-contact">
                {item.name}
              </Card.Title>
              <Card.Text className="card-text-contact">
                {item.address}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Address;
