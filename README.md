# Gym App API

Welcome to the Gym App API! This API allows users to manage their gym activities, including workouts, exercises, and progress tracking.

## Requirements

### Prerequisites

- Node.js (>=14.x)
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
    # or
    yarn install
    ```

3. Set up environment variables:
    Copy `.env.example` file in the root directory and add your variables:
    ```env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=test
    DATABASE_NAME=test
    SESSION_SECRET=your_secret_key
    APP_PORT=3000
    ```

4. Start the server:
    ```sh
    npx ts-node src/app.ts
    ```

### Usage

### API Endpoints


### Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

### License

This project is licensed under the MIT License.

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
    npx ts-node src/app.ts
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