# hotel-data-merge

The requirements of the applications is shown as below:

1. Manage a list of items and their locations within a 2D space.
2. CRUD operations for both **items** and **locations**.
3. Location can exist without items, but each item must be assigned to a location
4. Item can be moved between locations
5. **Multiple items can exist at the same location**

## Tech stack

- Node.JS
- Express
- Typescript
- [Vitest](https://vitest.dev/guide/).

## Prerequisites

Ensure [Node.js](https://nodejs.org/en/) installed.

## Step-by-step

1. Clone this repository with command below, can copy and paste to the cmd.

```bash
git clone https://github.com/wng97/Mlion-Assignment.git
```

2. Open up the folder in VS code

3. Install dependencies

```bash
npm install
```

4. Run up the app

```bash
npm run dev
```

5. The server will listening on port `5001`. Can start playing around with the API, enjoy!

## API Design

There is total 10 API, these 10 API can categories to 2 main features, locations and also items as below:

### Locations

1. Create location

```bash
POST http://localhost:5001/locations/create
```

Request body:

- **name** : string, mandatory
- **coordinate** : number[][] mandatory and length must be exactly 4

2. List all location

```bash
GET http://localhost:5001/locations/list
```

3. Retrieve a specific location

```bash
GET http://localhost:5001/locations/:location_id
```

Request params:

- **location_id** : string, mandatory

4. Update location's name

```bash
PUT http://localhost:5001/locations/:location_id
```

Request params:

- **location_id** : string, mandatory

Request body:

- **name** : string, mandatory

5. Delete a specific location

```bash
DELETE http://localhost:5001/locations/:location_id
```

Request params:

- **location_id** : string, mandatory

### Items

1. Create item

```bash
POST http://localhost:5001/items/create/:location_id
```

Request params:

- **location_id** : string, mandatory

Request body:

- **name** : string, mandatory
- **type** : string, mandatory
- **length**: number, mandatory
- **width**: number, mandatory
- **height**: number, mandatory

2. List all items

```bash
GET http://localhost:5001/items/list
```

3. Retrieve a specific item

```bash
GET http://localhost:5001/items/:item_id
```

Request params:

- **item_id** : string, mandatory

4. Update item's location

```bash
PUT http://localhost:5001/items/:item_id/location/:location_id
```

Request params:

- **item_id** : string, mandatory
- **location_id**: string, mandatory

5. Delete a specific item

```bash
DELETE http://localhost:5001/items/:item_id
```

Request params:

- **item_id** : string, mandatory
