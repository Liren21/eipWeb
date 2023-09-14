


import 'animate.css'
import {cssTransition,  toast, TypeOptions} from 'react-toastify'
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

interface IToaster {

    msg: string
    type: TypeOptions
}

class Toaster implements IToaster {
    msg = ''
    toastId = ''
    type: TypeOptions = toast.TYPE.INFO

    constructor(obj: IToaster) {
        this.msg = obj.msg
        this.type = obj.type
        this.notify(obj.msg, obj.type)
    }

    notify(msg: string, type?: TypeOptions): void {

        // @ts-ignore
        this.toastId = toast(msg, { type: type, autoClose: false, transition: fade ,position: "top-right",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           })
    }
}

export default Toaster
