const testData = {
  "users": [
    {
      "_id":  "641c8c0e07e646bd3fa7ac2c"
      ,
      "username": "martaconti",
      "name": "Marta Conti",
      "email": "marta@chitter.com",
      "password": "$2a$10$ukXMY0bXkiRJy/.gh/AsS.H6jQ9igK9xXPVDjVymeFpVtS9TdO4UO",
      "__v": 0,
    },
    {
      "_id": "641cd523bb2e046a801f69c3",
     
      "username": "july",
      "name": "Julia",
      "email": "julia@chitter.com",
      "password": "$2a$10$pGijQV3r67oaBaxwGn/NNuQ3VnTbcbx9gii017Q0pch5ZZBrv5ogS",
      "__v": 0,
    },
  ],
  "peeps":[
    {
      "_id": "641df7cf8a7f87a01da3e6d7",
      "content": "this is my first peep",
      "user": "641c8c0e07e646bd3fa7ac2c",
      "comments": [
        {
          "content": "first comment",
          "user": "641c8c0e07e646bd3fa7ac2c",
          "username": "martaconti",
          "_id": "641df7e28a7f87a01da3e6dd",
          "createdAt": "2023-03-24T19:20:02.769Z",
          "updatedAt": "2023-03-24T19:20:02.769Z"
        },
        {
          "content": "second comment",
          "user": "641c8c0e07e646bd3fa7ac2c",
          "username": "martaconti",
          "_id": "641df8e298b59ec67e09365c",
          "createdAt": "2023-03-24T19:24:18.509Z",
          "updatedAt": "2023-03-24T19:24:18.509Z"
        }
      ],
      "createdAt": "2023-03-24T19:19:43.892Z",
      "updatedAt": "2023-03-24T19:24:18.510Z",
      "__v": 0,
    }
  ]
};

export default testData;