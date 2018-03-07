const Modal = function () {
    let modalElement,
        modalState = 1;

    function setElement(element) {
        modalElement = element;
    }

    function open() {
        modalElement.style.display = 'flex';
        modalState = 1;
    }

    function close() {
        modalElement.style.display = 'none';
        modalState = 0;
    }

    function toggle(modalElement) {
        if (modalState === 0) {
            open();
        } else {
            close();
        }

    }

    return {
        setElement: setElement,
        open: open,
        close: close,
        toggle: toggle
    }
}

export default Modal;