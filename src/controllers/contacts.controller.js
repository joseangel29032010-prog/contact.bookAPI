
const contactsData = require('../data/contacts.data');
const AppError = require('../utils/AppError');

function getAllContacts(req, res, next) {
  try {
    res.status(200).json(contactsData.getAll());
  } catch (error) {
    next(error);
  }
}

function getContactById(req, res, next) {
  try {
    const contact = contactsData.getById(req.params.id);

    if (!contact) {
      return next(new AppError('Contacto no encontrado', 404));
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

function createContact(req, res, next) {
  try {
    const { phone } = req.body;

    const duplicate = contactsData.getAll().some(
      contact => contact.phone === phone
    );

    if (duplicate) {
      return next(
        new AppError('Ya existe un contacto con ese teléfono', 409)
      );
    }

    const contact = contactsData.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
}

function updateContact(req, res, next) {
  try {
    const existing = contactsData.getById(req.params.id);

    if (!existing) {
      return next(new AppError('Contacto no encontrado', 404));
    }

    const { name, phone, email, category, favorite } = req.body;

    const duplicate = contactsData.getAll().some(
      contact =>
        contact.id !== existing.id &&
        contact.phone === phone
    );

    if (duplicate) {
      return next(
        new AppError('Ya existe un contacto con ese teléfono', 409)
      );
    }

    const updated = contactsData.update(req.params.id, {
      name,
      phone,
      email,
      category: category ?? 'other',
      favorite: favorite ?? false
    });

    res.status(200).json({
      ...updated,
      id: existing.id,
      createdAt: existing.createdAt
    });
  } catch (error) {
    next(error);
  }
}

function toggleFavorite(req, res, next) {
  try {
    const contact = contactsData.getById(req.params.id);

    if (!contact) {
      return next(new AppError('Contacto no encontrado', 404));
    }

    const updated = contactsData.update(req.params.id, {
      favorite: !contact.favorite
    });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

function deleteContact(req, res, next) {
  try {
    const deleted = contactsData.remove(req.params.id);

    if (!deleted) {
      return next(new AppError('Contacto no encontrado', 404));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

function getContactStats(req, res, next) {
  try {
    const contacts = contactsData.getAll();

    const byCategory = {
      family: 0,
      friends: 0,
      work: 0,
      other: 0
    };

    for (const contact of contacts) {
      byCategory[contact.category]++;
    }

    res.status(200).json({
      clientId: req.clientId,
      total: contacts.length,
      favorites: contacts.filter(contact => contact.favorite).length,
      byCategory
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  toggleFavorite,
  deleteContact,
  getContactStats
};
