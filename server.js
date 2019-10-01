const express = require('express')
const expressGraphQL = require('express-graphql')
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} = require('graphql')

const app = express()

const authors = [
	{id: 1, name: 'Dante Alighieri'},
	{id: 2, name: 'ante lighieri'},
	{id: 3, name: 'Fante Dlighieri'}
]

const books = [
  {
    "author_id": 1,
    "country": "Nigeria",
    "imageLink": "images/things-fall-apart.jpg",
    "language": "English",
    "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    "pages": 209,
    "title": "Things Fall Apart",
    "year": 1958
  },
  {
    "author_id": 3,
    "country": "Italy",
    "imageLink": "images/the-decameron.jpg",
    "language": "Italian",
    "link": "https://en.wikipedia.org/wiki/The_Decameron\n",
    "pages": 1024,
    "title": "The Decameron",
    "year": 1351
  },
  {
    "author_id": 2,
    "country": "Denmark",
    "imageLink": "images/fairy-tales.jpg",
    "language": "Danish",
    "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
    "pages": 784,
    "title": "Fairy tales",
    "year": 1836
  },
  {
    "author_id": 3,
    "country": "Italy",
    "imageLink": "images/the-divine-comedy.jpg",
    "language": "Italian",
    "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
    "pages": 928,
    "title": "The Divine Comedy",
    "year": 1315
  },
  {
    "author_id": 1,
    "country": "Sumer and Akkadian Empire",
    "imageLink": "images/the-epic-of-gilgamesh.jpg",
    "language": "Akkadian",
    "link": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
    "pages": 160,
    "title": "The Epic Of Gilgamesh",
    "year": -1700
  },
  {
    "author_id": 2,
    "country": "Achaemenid Empire",
    "imageLink": "images/the-book-of-job.jpg",
    "language": "Hebrew",
    "link": "https://en.wikipedia.org/wiki/Book_of_Job\n",
    "pages": 176,
    "title": "The Book Of Job",
    "year": -600
  }]


const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'Book representation',
	fields: () => ({
		year: {type: GraphQLNonNull(GraphQLInt)},
		title: {type: GraphQLNonNull(GraphQLString)},
		author_id: {type: GraphQLNonNull(GraphQLInt)},
		author: {
			type: AuthorType,
			resolve: (book) => {
				return authors.find(author => author.id === book.author_id)
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	description: 'Author representation',
	fields: () => ({
		id: {type: GraphQLNonNull(GraphQLInt)},
		name: {type: GraphQLNonNull(GraphQLString)},
		books: {
			type: GraphQLList(BookType),
			resolve: (author) => {
				return books.filter(book => book.author_id === author.id)
			}
		}
	})
})


const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		books: {
			type: new GraphQLList(BookType),
			description: 'List of All Books',
			resolve: () => books
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of All Authors',
			resolve: () => authors
		}
	})
})


const schema = new GraphQLSchema({
	query: RootQueryType
})

app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true
}))
app.listen(5000., () => console.log("s. running"))