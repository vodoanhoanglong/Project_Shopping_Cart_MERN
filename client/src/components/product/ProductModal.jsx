import React, { useContext } from "react";
import Slider from "react-slick";

import { Modal, Button } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";

const ProductModal = ({ url }) => {
  const { showModal, setShowModal } = useContext(ProductContext);

  const closeDialog = () => setShowModal(false);

  const settings = {
    customPaging: function (i) {
      return <div></div>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Modal show={showModal} onHide={closeDialog}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button onClick={closeDialog}>Close</Button>
          <Button onClick={closeDialog}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>

    // <Slider {...settings}>
    //   {/* <div>
    //           <img src={url} alt="" />
    //         </div> */}
    //   <div>
    //     <img
    //       src="https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-02.jpg.pagespeed.ic.1bDtXoN8v6.webp"
    //       alt=""
    //     />
    //   </div>
    //   <div>
    //     <img
    //       src="https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-03.jpg.pagespeed.ic.-rPS2k8YRO.webp"
    //       alt=""
    //     />
    //   </div>
    //   <div>
    //     <img
    //       src="https://preview.colorlib.com/theme/cozastore/images/xproduct-detail-01.jpg.pagespeed.ic.p3moSJxG7I.webp"
    //       alt=""
    //     />
    //   </div>
    // </Slider>
  );
};

export default ProductModal;
