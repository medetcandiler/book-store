import express from 'express';
import { BookModal } from '../models/bookModel.js'

const router = express.Router();

//get
router.get('/', async (_, response) => {
  try {
    const books = await BookModal.find({});
    response.status(200).send({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

//add
router.post('/', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({ message: 'Send all requestuired fields: title, author, publishYear' })
    };

    const book = await BookModal.create(request.body);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message })
  }
})

//get
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await BookModal.findById(id);

    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

//update
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({ message: 'Provide all the requirement fields: title, author, publishYear' })
    }

    const { id } = request.params;

    const result = await BookModal.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully ' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message
    })
  }
})

//delete
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await BookModal.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: 'Book not found' })
    }

    response.status(200).send({ message: 'Successfully deleted' })
  } catch (err) {
    console.log(err.message);
    return response.status(500).send({ message: err.message })
  }
})

export default router;