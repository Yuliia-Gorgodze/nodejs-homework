const fs = require('fs').promises
const shortid = require('shortid');
const path = require('path')
const contactsPath = path.join(__dirname, './db/contacts.json');


function findContact (contacts,contactId){
  const contact = contacts.find(contact=>contact.id === contactId);
  return contact;
};

function listContacts() {
 fs.readFile(contactsPath)
    .then((data) => {
        const parseData = JSON.parse(data)
        console.table(parseData);
    })
    .catch((err) => console.log(err.message))
}

  function getContactById(contactId) {
    fs.readFile(contactsPath).then(data => {
      const contacts = JSON.parse(data);
      const filterDataId = contacts.filter(contact => contact.id === Number(contactId))
      console.table(filterDataId)
       })
     .catch((err) => console.log("Такого контакта нет: ", err.message))
  }

  function removeContact(contactId) {
    
    fs.readFile(contactsPath).then(data => {
      const contacts = JSON.parse(data);
      const bool = findContact(contacts, Number(contactId))
      if(!bool){
        console.log("Такого контакта нету")
        return
      }
        const dataArray = [...contacts]
        const parseContact =  JSON.stringify(dataArray.filter(contact => contact.id !== Number(contactId)))
        fs.writeFile(contactsPath, parseContact)
        console.log("Контакт удалён");
    })
    .catch((err) => console.log(err.message))
  }

  function addContact(name, email, phone) {
    fs.readFile(contactsPath)
      .then(data => {
        const contacts = JSON.parse(data)
        const newObject = {
          id: shortid.generate(),
          name,
          email,
          phone
        }
          const dataArray = [...contacts]
          dataArray.push(newObject)
         return JSON.stringify(dataArray)
      }).then(contacts =>   {
        fs.writeFile(contactsPath, contacts)
        console.log("Упешно добавлен")
      }       
      )
      .catch((err) => console.log(err.message))
  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };