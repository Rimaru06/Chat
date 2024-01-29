import { Formik, Form, Field, ErrorMessage } from "formik"
import Modal from "./Modal"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("invalid email").required("Email is required")
})
const AddandUpdateContact = ({ open, onClose, isupdate, contact }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "Contact");
            await addDoc(contactRef, contact)
            onClose();
            toast.success("Contact added Succesfully")


        } catch (error) {
            console.log(error)
        }
    }
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "Contact", id);
            await updateDoc(contactRef, contact)
            onClose();
            toast.success("Contact updated Succesfully")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Modal isOpen={open} onclose={onClose}>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={
                        isupdate
                            ? {
                                name: contact.name,
                                email: contact.email
                            } :
                            {
                                name: "",
                                email: ""
                            }}
                    onSubmit={(values) => {
                        isupdate ?
                            updateContact(values, contact.id) :
                            addContact(values);
                    }}
                >
                    <Form className="flex flex-col gap-4 ">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">name</label>
                            <Field name="name" className="border h-10" />
                            <div className="text-xs text-red">
                                <ErrorMessage name="name" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">email</label>
                            <Field type="email" name="email" className="border h-10" />
                            <div className="text-xs text-red">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <button type="sumbit" className="bg-orange-500 px-3 py-1.5 border self-end">
                            {isupdate ? "update" : "add"} contact
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default AddandUpdateContact