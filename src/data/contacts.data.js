
const contacts = [
  {
    id: 1,
    name: 'Juan Pérez',
    phone: '809-555-0101',
    email: 'juan@example.com',
    category: 'family',
    favorite: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'María García',
    phone: '829-555-0102',
    email: 'maria@example.com',
    category: 'friends',
    favorite: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Carlos López',
    phone: '+1 849 555 0103',
    email: 'carlos@example.com',
    category: 'work',
    favorite: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 4;

function getAll() {
  return contacts;
}

function getById(id) {
  return contacts.find(contact => contact.id === Number(id));
}

function create(data) {
  const contact = {
    id: nextId++,
    name: data.name,
    phone: data.phone,
    email: data.email,
    category: data.category || 'other',
    favorite: data.favorite ?? false,
    createdAt: new Date().toISOString()
  };

  contacts.push(contact);
  return contact;
}

function update(id, data) {
  const contact = getById(id);

  if (!contact) {
    return null;
  }

  Object.assign(contact, data);
  return contact;
}

function remove(id) {
  const index = contacts.findIndex(
    contact => contact.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(index, 1);
  return deletedContact;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
