## Setup

```
npm install
# RUN
npm run devStart

# Fresh setup
npm i express express-graphql graphql
npm i --save-dev nodemon
npm install
npm run devStart
```

http://localhost:5000/graphql?

### GET

```
{
  books{
    title
	language
  }
}

```

Get Authors:

```
{
  authors{
    name
	id
  }
}
	
```

### Mutations

Add Book:
```
mutation{
  addBook(title: "My book", author_id: 1, language: "French"){
    language
    title
  }
}
```

Add Author:
```
mutation{
  addAuthor(name: "Alex Hoffmann"){
    id
    name
  }
}
```
