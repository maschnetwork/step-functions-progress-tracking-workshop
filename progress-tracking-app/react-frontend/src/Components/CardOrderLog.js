import React from "react";
import CardGroup from "react-bootstrap/CardGroup";
import CardHeader from "react-bootstrap/CardHeader";
import { Card, ListGroup } from "react-bootstrap";

function CardOrderLog(props) {
  const { msgs } = props;

  return (
    <CardGroup className="CardOrderLog-CardGroup">
      <Card className="CardOrderLog-Card">
        <CardHeader className="CardOrderLog-CardHeader">
          Detailed status of your order processing
        </CardHeader>
        <Card className="ProgressLog-Card">
          <ListGroup>
            {msgs.map((msg, key) => (
              <ListGroup.Item key={key} className="ProgressLog-ListGroupItem">
                {"📦 " + msg}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Card>
    </CardGroup>
  );
}

export default CardOrderLog;
