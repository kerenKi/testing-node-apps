// Testing Controllers

// 🐨 you'll need a few of the generaters from test/utils/generate.js
import {
  buildReq,
  buildRes,
  buildUser,
  buildBook,
  buildListItem,
} from 'utils/generate'

// 🐨 getListItem calls `expandBookData` which calls `booksDB.readById`
// so you'll need to import the booksDB from '../../db/books'
import * as booksDB from '../../db/books'
// 🐨 don't forget to import the listItemsController from '../list-items-controller'
// here, that's the thing we're testing afterall :)
import * as listItemsController from '../list-items-controller'

// 🐨 use jest.mock to mock '../../db/books' because we don't actually want to make
// database calls in this test file.
jest.mock('../../db/books')

// 🐨 ensure that all mock functions have their call history cleared using
// jest.resetAllMocks here as in the example.
beforeEach(() => {
  jest.clearAllMocks()
})

test('getListItem returns the req.listItem', async () => {
  const user = buildUser()
  const book = buildBook()

  // 🐨 create a listItem that has the user as the owner and the book
  const listItem = buildListItem({ownerId: user.id, bookId: book.id})

  // 🐨 mock booksDB.readById to resolve to the book
  booksDB.readById.mockResolvedValueOnce(book)
  //
  // 🐨 make a request object that has properties for the user and listItem
  const request = buildReq({user, listItem})
  // 🐨 make a response object
  const response = buildRes()

  // 🐨 make a call to getListItem with the req and res (`await` the result)
  await listItemsController.getListItem(request, response)
  // 🐨 assert that booksDB.readById was called correctly
  expect(booksDB.readById).toHaveBeenCalledTimes(1)
  expect(booksDB.readById).toHaveBeenCalledWith(book.id)

  //🐨 assert that res.json was called correctly
  expect(response.json).toHaveBeenCalledTimes(1)
  expect(response.json).toHaveBeenCalledWith({listItem: {...listItem, book}})
})
