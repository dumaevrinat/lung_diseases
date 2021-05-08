import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useSnackbar} from 'notistack'
import {removeSnackbar} from '../../actions/notifications'

let displayed = []

const Notifier = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications.notifications)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                closeSnackbar(key);
                return;
            }

            if (displayed.includes(key)) return;

            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    dispatch(removeSnackbar(myKey));
                    removeDisplayed(myKey);
                },
            });

            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    return null
}

export default Notifier
