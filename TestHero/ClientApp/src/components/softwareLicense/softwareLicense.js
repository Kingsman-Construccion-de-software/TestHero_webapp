import React, { useState } from "react";
import { GrLicense } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";
import styles from "./softwareLicense.module.css";

/**
 * @author Leonardo García
 * @license GP
 * @version 1.0.0
 * Componente para el modal de aviso de privacidad, pa' no hardcodear
 */

export default function SoftwareLicense() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className={styles["positionLicense"]} onClick={() => setShow(true)}>
        <GrLicense size={50} className={styles["crudIcon"]} />
      </div>
      <Modal show={show} onHide={handleClose} className={styles["modal"]}>
        <Modal.Header  className={styles["modaldetalles"]}>
          <Modal.Title className={`${styles.modalTitulo}`}>
            Licencia de nuestro Software    
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${styles.modaldetalles} ${styles.fontbody}`}>
          Este software está bajo la Licencia Pública General de GNU (GPL), que
          es una licencia de software libre que garantiza a los usuarios finales
          la libertad de usar, estudiar, compartir y modificar el software. Si
          usted distribuye copias o versiones modificadas de este software, debe
          hacerlo bajo los mismos términos de la GPL y proporcionar el código
          fuente a los receptores. Además, debe indicar claramente los cambios
          que ha realizado y no ofrecer ninguna garantía sobre el software. No
          puede impedir que los usuarios instalen o ejecuten versiones
          modificadas del software en sus dispositivos. Para más información
          sobre la GPL, consulte 
          https://www.gnu.org/licenses/gpl-3.0.en.html
        </Modal.Body>
        <Modal.Footer className={styles["modaldetalles"]}>
          <Button
            variant="secondary"
            onClick={handleClose}
            className={styles["botonCancelar2"]}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
