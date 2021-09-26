import React from "react";
import { RatingContext } from "../../contexts/RatingContext";

const Comment = (props) => {
  const { idProduct, idUser } = props;

  const { getCommentUser } = React.useContext(RatingContext);
  console.log(getCommentUser(idProduct, idUser));

  return <div></div>;
};

export default Comment;
