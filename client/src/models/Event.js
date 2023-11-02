export class Event{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.createdAt = new Date(this.createdAt).toLocaleDateString()
        this.updatedAt = new Date(this.updatedAt)
        this.creator = data.creator
    }
}

const eventData = `
{
    "_id": "654278718028100c398cd31b",
    "creatorId": "652ec5cdc493eda84a6f68df",
    "name": "Planking World Cup",
    "description": "Will never, ever, be the same, again! Welcome to Raw Is Jericho! Beat me if you can, survive if I let you. That’s the bottom line because Stone Cold said so! Whatcha gonna do when Hulkamania runs wild on you! I am the ayatollah of rock n rolla! I am the best in the world. I am the best there is, the best there was, and the best there ever will be.",
    "coverImg": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
    "location": "At The Social Expo Center",
    "capacity": 140,
    "startDate": "2023-11-11T07:00:00.000Z",
    "isCanceled": false,
    "type": "sport",
    "createdAt": "2023-11-01T16:10:25.251Z",
    "updatedAt": "2023-11-01T16:10:25.251Z",
    "__v": 0,
    "creator": {
        "_id": "652ec5cdc493eda84a6f68df",
        "name": "randomdude",
        "picture": "https://s.gravatar.com/avatar/df7b5686c7360e3b2f157fd2c5771c90?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fra.png",
        "id": "652ec5cdc493eda84a6f68df"
    },
`