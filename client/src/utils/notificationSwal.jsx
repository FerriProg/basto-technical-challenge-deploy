import Swal from 'sweetalert2';

//this function is used every time a sweet alert notification is fired

export const notificationSwal = (titleText, text, icon, confirmButtonText) => {
  Swal.fire({
    titleText: titleText,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
};
