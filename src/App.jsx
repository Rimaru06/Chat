import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { IoSearch } from "react-icons/io5";
import { BsPlusCircle } from "react-icons/bs";
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './config/firebase';
import ContactCard from './Components/ContactCard';
import AddandUpdateContact from './Components/AddandUpdateContact';
import useDisclose from './hooks/useDisclose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './Components/NotFoundContact';



const App = () => {
  const [contacts, setcontact] = useState([]);
 const {open , onClose , onOpen} = useDisclose()
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsCollection = collection(db, "Contact")
        onSnapshot(contactsCollection , (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setcontact(contactList)
          return contactList;
        })
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();

  }, [])

  const fliterContact = (e) => {
    const value = e.target.value;
    const contactsCollection = collection(db, "Contact")
    onSnapshot(contactsCollection, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      const filteredContacts = contactList.filter(contact=> contact.name.toLowerCase().includes(value.toLowerCase()))
      setcontact(filteredContacts)

      return filteredContacts;
    })


  }

  return (
    <>
    <div className='max-w-[370px] mx-auto' >
      <Navbar />
      <div className='flex relative items-center '>
        <IoSearch className='text-white text-3xl absolute ml-1  ' />
          <input onChange={fliterContact} type="search" className='border-2 border-white bg-transparent rounded-md w-[295px] h-10 flex-grow text-white pl-10' />
        <div className='ml-2'>
          <BsPlusCircle onClick={onOpen} className='text-white text-4xl cursor-pointer' />
        </div>
      </div>
      <div className='mt-4'>
        {contacts.length <= 0 ? <NotFoundContact /> : contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
    <AddandUpdateContact open={open} onClose={onClose} />
    <ToastContainer position='bottom-center' />
    </>
  )
}

export default App