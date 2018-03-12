const Popup = function () {
    let notificationAllowed = 0;

    // ask teh user for permission on load and store their response for theri session
    function establishNotifyPermissions() {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                notificationAllowed = 1;
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission((permission) => {
                    if (permission === 'granted') {
                        notificationAllowed = 1;
                    }
                });
            }
        }
    }

    // if we have permission, create a notification with a title and icon based on teh message input object
    function notifyUser(message) {
        if (Boolean(notificationAllowed)) {
            const OPTIONS = { icon: message.icon };
            const n = new Notification(message.title, OPTIONS);
            setTimeout(n.close.bind(n), 5000);
        }
    }

    return {
        getPermission: establishNotifyPermissions,
        notify: notifyUser
    }
}

export default Popup;