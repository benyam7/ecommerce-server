# Ecommerce server app

# Tech stack used

1. Node.js
2. Express
3. GRAPHQL
4. Mongo DB

## Complete documenation is found in the following directory

_doc/schema/_

open _index.html_ to get documentation

## Jump on api using already deployed live link

<https://ecommerce--server.herokuapp.com/>

## Steps for using live link

1. download [graphiql](https://www.electronjs.org/apps/graphiql) here
2. use the above url to interact with api

## Steps for setup with out docker

1. clone the repo
2. run **npm install**
3. app will start running at localhost:5000

## Steps for setup with docker

1. clone the repo
2. inside to project root directory
3. run `docker-compose up`

## here is how to play with it

_also, to save you some time ;)_

### Register

```
mutation registerUser {
  register(userInput: {
    firstName: "benyam"
    lastName: "Seifu"
    email:"binychanyalew5@gmail.com"
    role: "BUYER"
    password:"testtest"
    confirmPassword: "testtest"
  }) {
    ... on Token {
      token
    }
    ... on UserInputError {
      userInputErrors {
        email
        password
        confirmPassword
        role
        lastName
        firstName
      }
      valid
    }

    ... on TokenError {
      message
      type
    }

    ... on RegisterError {
      message
      type
    }

    ... on Error {
      message
      type
    }
  }
}


```

### Login

```

mutation {
  login(email: "binychanyalew9@gmail.com"
  	password: ""
  ){
  	... on Token {
      token
    }

    ... on UserInputError {
      message
      type
      userInputErrors {
        email
        password
      }
      valid
    }

    ... on TokenError {
      message
      type
    }

    ... on LogInError {
      type
      message
    }
  }
}

```

### Add Item

```

mutation addItem {
  addItem(
    newItem: {
      name: "puma shoe max"
      price: 900
      photoUrl: "https://benyam-seifu.netlify.app/"
      description: "test description"
    }
  ) {
    ... on Item {
      id
      name
      price
      photoUrl
      description
      vendor {
        firstName
        lastName
        email
      }
    }

    ... on AddItemError {
      type
      message
    }
    ... on ItemInputErrors {
      type
      message
      itemError {
        name
        price
        photoUrl
        description
      }
    }

    ... on NotAuthenticatedUserError {
      type
      message
    }
  }
}

```

### Delete Item

```


mutation {
  deleteItem(itemId: "5faef4d740271a52f0110afa") {
    ... on DeletionSuccess {
      message
    }
    ... on DeleteItemError {
      message
      type
    }

    ... on NotAuthenticatedUserError {
      message
      type
    }

    ... on ItemNotOwnerError {
      message
      type
    }
    ... on ItemDoesntExistError {
      message
      type
    }
  }
}


```

### Edit Item

```

mutation {
  editItem(updateItem: {
    name: "test"
   	description: "test"
    price: 23
  }, itemId: "5faf008e0ac3556a9024e1ad") {
    ... on Item {
      id
      name
      price
      photoUrl
      description
    }
    ... on EditItemError {
      type
      message
    }
    ... on ItemNotOwnerError {
      type
      message
    }

    ... on NotAuthenticatedUserError {
      type
      message
    }

    ... on ItemDoesntExistError {
      type
      message
    }

    ... on ItemInputErrors {
      message
      type
      itemError {
        name
        price
        photoUrl
        description
      }
    }

  }
}

```

### Get Single Item

```

query {
  item(itemId: "5faf008e0ac3556a9024e1ad"){
    ... on Item {
      id
      name
      price
      photoUrl
      description
      vendor {
        firstName
        lastName
        email
      }
    }

    ... on NotAuthenticatedUserError {
	message
    type
    }
    ...  on ItemDoesntExistError {
      message
      type
    }

    ... on GetItemError {
      message
      type
    }

  }
}
```

### Get all items

```

query {
  items(ascending: false
    cursor: "2020-11-14T09:03:14.791Z"
    limit: 2){
    ... on Items {
      items {
        id
        name
        price
        photoUrl
        description
        vendor {
          firstName
          lastName
          email
        }
        createdAt
      }
    }

    ... on NotAuthenticatedUserError {
      type
      message
    }


    ... on GetItemsError {
      type
      message
    }
  }
}


```

### Add Items to Cart

```

mutation {
  addItemsToCart(items: [
    {
      item: "5faf99450b9c826c440acf9d"
      quantity: 10
    },{
      item: "5faf9d52e6d25f35341e1ed1"
      quantity: 30
    }
  ], cartId:"5fafb016de5a7f22109f849f") {
    ... on CartAdditionSuccess {
      message
      cartId
    }

    ... on NotAuthenticatedUserError {
      message
      type
    }

    ... on AddItemsToCartError {
      message
      type
    }
  }
}

```

### Remove Item from Cart

```

mutation {
  removeItemFromCart(itemId: "5faf9d52e6d25f35341e1ed1") {

    ... on RemoveItemFromCartSuccess {
      message
    }
    ... on NotAuthenticatedUserError {
      type
      message
    }

    ... on RemoveItemFromCartError {
      type
      message

    }
  }
}

```

### Edit Item Quantity from Cart

```

mutation {
  editItemQuantityInCart(itemId: "5faf9d52e6d25f35341e1ed1", cartId: "5fafc28baa63ec5fbc34c658", quantity:3) {
    ... on EditItemQuantityInCartSuccess {
      message
    }

    ... on NotAuthenticatedUserError {
      message
      type
    }
    ... on EditItemQuantityInCartError {
      message
      type
    }
    ... on EditItemQuantityInCartInputError {
      message
      type
      valid
      quantity
    }
  }
}

```

### Get Cart Detail

```


query {
  cartDetails(cartId: "5fafc28baa63ec5fbc34c658"){
   ... on NotAuthenticatedUserError {
    message
    type
  }
    ... on CartDetail {
      totalPrice
      totalItems
      items{
        name
        price
        photoUrl
        description
        vendor
      }
    }

    ... on CartDetailError {
      message
      type

    }
}
}
```
