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
    "language": "English",
    "title": "Things Fall Apart",
    "year": 1958
  },
  {
    "author_id": 3,
    "language": "Italian",
    "title": "The Decameron",
    "year": 1351
  },
  {
    "author_id": 2,
    "language": "Danish",
    "title": "Fairy tales",
    "year": 1836
  },
  {
    "author_id": 3,
    "language": "Italian",
    "title": "The Divine Comedy",
    "year": 1315
  },
  {
    "author_id": 1,
    "language": "Akkadian",
    "title": "The Epic Of Gilgamesh",
    "year": -1700
  },
  {
    "author_id": 2,
    "language": "Hebrew",
    "title": "The Book Of Job",
    "year": -600
  }]


const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'Book representation',
	fields: () => ({
		year: {type: GraphQLNonNull(GraphQLInt)},
		title: {type: GraphQLNonNull(GraphQLString)},
		language: {type: GraphQLNonNull(GraphQLString)},
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
		book: {
			type: BookType,
			description: 'A single book',
			args: {
				language: {type: GraphQLString}
			},
			resolve: (parent, args) => books.find(book => book.language === args.language)
		},
		books: {
			type: new GraphQLList(BookType),
			description: 'List of All Books',
			resolve: () => books
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of All Authors',
			resolve: () => authors
		},
		author: {
			type: AuthorType,
			description: 'Single author',
			args: {
				id: {type: GraphQLInt}
			},
			resolve: (parent, args) => authors.find(author => author.id === args.id)
		}
	})
})


const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutaiton',
	fields: () => ({
		addBook: {
			type: BookType,
			description: 'Add a book',
			args: {
				title: {type: GraphQLString},
				author_id: {type: GraphQLInt},
				language: {type: GraphQLString}
			},
			resolve: (parent, args) => {
				const book = {title: args.title, author_id: args.author_id, language: args.language}
				books.push(book)
				return book
			}
		},
		addAuthor: {
			type: AuthorType,
			description: 'Add a author',
			args: {
				name: {type: GraphQLString}
			},
			resolve: (parent, args) => {
				const author = {id: authors.length +1, name: args.name}
				authors.push(author)
				return author
			}
		}
	})
})

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true
}))
app.listen(5000., () => console.log("s. running"))