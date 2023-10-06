import 'animate.css'
import {cssTransition, toast, TypeOptions} from 'react-toastify'
import './toaster.scss'
import 'react-toastify/dist/ReactToastify.css';

/**
 * Toaster
 * Pool up messenger of app.
 * Dont set this file!!!
 */
const fade = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut",
})
const msgs = []

interface IToaster {

    msg: string
    type: TypeOptions
}

class Toaster implements IToaster {
    msg = ''
    toastId: any = ''
    type: TypeOptions = toast.TYPE.INFO

    constructor(obj: IToaster) {
        this.msg = obj.msg
        this.type = obj.type
        this.notify(obj.msg, obj.type)
    }

    notify(msg: string, type?: TypeOptions): void {
        this.toastId = toast(msg, {
            type: type, autoClose: 30000, transition: fade, position: "bottom-left",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        if (msgs.length > 6) {
            msgs.forEach((id) => {
                toast.dismiss(id)
            })

            msgs.splice(0, msgs.length)
        }

        msgs.push(this.toastId)
    }
}

export default Toaster
