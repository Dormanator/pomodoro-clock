const Popup = function () {
    let notificationAllowed = 0;

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