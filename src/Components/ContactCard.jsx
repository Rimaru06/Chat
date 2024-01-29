import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import {db} from '../config/firebase'
import AddandUpdateContact from './AddandUpdateContact'
import useDisclose from '../hooks/useDisclose'
import { toast } from 'react-toastify'
const ContactCard = ({contact}) => {
    const {open , onOpen , onClose} = useDisclose();
    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db,"Contact",id));
            toast.success("Contact Deleted Succesfully")
        } catch (error) {
           console.log(error) 
        }
    }
  return (
    <>
      <div key={contact.id} className='bg-yellow flex justify-between items-center h-[64px] rounded-md mt-2'>
          <div className='flex gap-2 '>
              <HiOutlineUserCircle className='text-orange-400 text-4xl' />
              <div className='text-sm'>
                  <h2 className='font-medium'> {contact.name} </h2>
                  <p className=''> {contact.email} </p>
              </div>
          </div>
          <div className='flex gap-2'>
              <RiEditCircleLine onClick={onOpen} className='text-3xl cursor-pointer' />
              <IoMdTrash onClick={ () => deleteContact(contact.id)} className='text-3xl text-orange-400 cursor-pointer' />
          </div>
      </div>
      <AddandUpdateContact contact={contact} isupdate open={open} onClose={onClose} />
    </>
  )
}

export default ContactCard