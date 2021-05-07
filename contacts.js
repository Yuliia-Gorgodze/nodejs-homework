const fs = require('fs').promises
const shortid = require('shortid');
const path = require('path')
const contactsPath = path.join(__dirname, './db/contacts.json');


// TODO: задокументировать каждую функцию
function findContact (contacts,contactId){
  const contact = contacts.find(contact=>contact.id === contactId);
  return contact;
};

function listContacts() {
  return  fs.readFile(contactsPath)
    .then((data) => {
        const parseData = JSON.parse(data)
        // console.log(parseData)
        return parseData
    })
    .catch((err) => console.log(err.message))
}


  function getContactById(contactId) {
  return listContacts().then(data => {
      const filterDataId = data.filter(contact => contact.id === Number(contactId))
      return filterDataId[0]
       })
     .catch((err) => console.log("Такого контакта нет: ", err.message))
  }

  function removeContact(contactId) {
    return listContacts()
    .then(data => {
      const bool = findContact(data, Number(contactId))
      if(!bool){
        console.log("Такого контакта нету")
        return
      }
        const dataArray = [...data]
        const filterContact =  dataArray.filter(contact => contact.id !== Number(contactId))
        const jsonStringify = JSON.stringify(filterContact)
        fs.writeFile(contactsPath, jsonStringify)
        console.log("Контакт удалён");
    })
    .catch((err) => console.log(err.message))
  }

  function addContact(name, email, phone) {
    return listContacts()
      .then(data => {
        const newObject = {
          id: shortid.generate(),
          name,
          email,
          phone
        }
          const dataArray = [...data]
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