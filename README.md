# Gym App API

Welcome to the Gym App API! This API allows users to manage their gym activities, including workouts, exercises, and progress tracking.

## Requirements

### Prerequisites

- Node.js (>=20.x)
- npm (>=6.x) or yarn (>=1.x)
- PostgreSQL (I installed via brew)
  ```sh
  brew install postgresql
  ```

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/gym_app_api.git
   cd gym_app_api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` file to `.env` in the root directory and add your variables:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_database
   TEST_DATABASE_NAME='your_database_test'
   SESSION_SECRET=your_secret_key
   APP_PORT=3000
   NODE_ENV=test | production | development
   ```

4. Start the server:
   ```sh
   npx ts-node src/server.ts
   ```

### Project Structure

`src/app.ts`: Main entry point initializing Express, middleware, and routing.

`src/routes/`: Route definitions for various features.

`src/models/`: TypeORM models representing database tables (e.g., User, Workout, Exercise).

`src/repositories/`: Custom repository files for advanced database operations.

`src/middleware/`: Custom middleware for request validation, error handling, and response formatting.

`src/swagger/`: Configuration for generating and serving Swagger API documentation.

`src/tests/` : Testing Suite

### API Docs

API documentation is available via Swagger. To access it, start the server and open:

`http://localhost:<PORT>/api-docs`
This endpoint provides a user-friendly interface for exploring available API routes and testing requests.

### Swagger Docs

Swagger Docs are generated via comments inside the route i.e

```
 /**
 * Get all user logs
 * GET /userlog/all
 * @param res Response
 * @returns Promise<void>
 */
router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["User Log"]
   * #swagger.description = "Retrieves all user logs."
   * #swagger.summary = "Get all user logs."
   * #swagger.path = '/userlog/all'
   * #swagger.responses[200] = { description: "User logs found." }
   * #swagger.responses[404] = { description: "User logs not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userLog = await UserLogRepository.getAllUserLogs();
    resourceValidator(userLog, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});
```

This needs to be inside the method after initialising the route.

Once these have been added, removed or updated run the swagger doc generator.

Run

`npm run swagger`

To generate new swagger documentation and commit.

### Database Setup

1. Install PostgreSQL:
   Follow the instructions for your operating system to install PostgreSQL from the [official website](https://www.postgresql.org/download/).

2. Create a new database:

   ```sh
   psql -U postgres
   CREATE DATABASE gym_app_db;
   ```

3. Set up environment variables with your database, user and password etc:
   Update your `.env` file

4. Run the application to sync and create tables etc based on entities

   ```sh
   npx ts-node src/server.ts
   ```

5. Run database migrations:

   ```sh
   npx typeorm-ts-node-commonjs schema:sync -d ./src/config/ormconfig.ts
   npx typeorm-ts-node-commonjs migration:run -d ./src/config/ormconfig.ts
   ```

   You can revert migrations by the following:

   ```sh
   npx typeorm-ts-node-commonjs migration:revert -d ./src/config/ormconfig.ts
   ```

### Testing and Testing ENV

Tests are using jest. It will run on the TEST Database directed by your .env. It will initialise a connection and run migration before tests and revert the migration and close connection on cleanup as directed in:

```sh
  jest.setup.ts
```

```js
  beforeAll(async () => {
    const db = await AppDataSource.initialize();
    // console log the name of the db connected
    console.log("Connected to: " + db.options.database);
    await AppDataSource.synchronize(true);
    await AppDataSource.runMigrations();
    server = app.listen(PORT || "3000");
  });

  afterAll(async () => {
    await AppDataSource.undoLastMigration();
    await AppDataSource.destroy();
    server?.close();
  });
```

1. Create a new database for testing

```sh
  psql -U postgres
  CREATE DATABASE gym_app_db_test;
```

2. Run `npm test`

_note_ npm test forces NODE_ENV to be "test" - this triggers tests to be run on the TEST DATABASE. This does not need to be set in your .env, it runs as part of the script to run tests.

```sh
  "test": "NODE_ENV=test jest --runInBand --forceExit",
```

```sh
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database
*TEST_DATABASE_NAME='your_database_test'*
SESSION_SECRET=your_secret_key
APP_PORT=3000
NODE_ENV=test | production | development
```
