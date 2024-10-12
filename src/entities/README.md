# Database Structure

https://dbdiagram.io/d/Gym-Bro-6704eeeffb079c7ebdb4c753

## Database Tables

### Users Table
| Column          | Type         | Constraints                   |
|-----------------|--------------|-------------------------------|
| id              | UUID         | Primary Key, Unique           |
| username        | varchar      | Not Null, Unique              |
| email           | varchar(255) | Not Null, Unique              |
| password_hash   | varchar(255) | Not Null                      |
| created_at      | timestamp    | Default: `now()`              |

---

### Exercises Table
| Column         | Type         | Constraints                   |
|----------------|--------------|-------------------------------|
| id             | UUID         | Primary Key, Unique           |
| name           | varchar      | Not Null                      |
| muscle_group   | varchar      |                               |
| equipment      | varchar      |                               |

---

### Public Workouts Table
| Column        | Type         | Constraints                   |
|---------------|--------------|-------------------------------|
| id            | UUID         | Primary Key, Unique           |
| name          | varchar      |                               |
| exercises     | array        | References: exercises.id      |
| created_by    | UUID         | References: users.id          |
| created_at    | timestamp    | Default: `now()`              |

---

### Mesocycles Table
| Column        | Type         | Constraints                   |
|---------------|--------------|-------------------------------|
| id            | UUID         | Primary Key, Unique           |
| name          | varchar      |                               |
| length        | integer      |                               |
| workouts      | array        | References: public_workouts.id|
| created_by    | UUID         | References: users.id          |

---

### Mesocycle Days Table
| Column        | Type         | Constraints                   |
|---------------|--------------|-------------------------------|
| id            | UUID         | Primary Key, Unique           |
| mesocycle_id  | UUID         | References: mesocycles.id     |
| day_number    | integer      |                               |
| workout_id    | UUID         | Nullable, References: public_workouts.id |
| rest_day      | boolean      |                               |

---

### User Workout History Table
| Column        | Type         | Constraints                   |
|---------------|--------------|-------------------------------|
| id            | UUID         | Primary Key, Unique           |
| user_id       | UUID         | References: users.id          |
| workout_id    | UUID         | References: public_workouts.id |
| date          | timestamp    |                               |

---

### User Workout Sets Table
| Column             | Type         | Constraints                   |
|--------------------|--------------|-------------------------------|
| id                 | UUID         | Primary Key, Unique           |
| user_workout_id    | UUID         | References: user_workout_history.id |
| exercise_id        | UUID         | References: exercises.id      |
| set_number         | integer      |                               |
| reps               | integer      |                               |
| weight             | integer      |                               |


---

## Database Model

```plaintext
// Users Table
Table users {
  id UUID [pk, unique]                 
  username varchar [not null, unique]             
  email varchar(255) [not null, unique]
  password_hash varchar(255) [not null]
  created_at timestamp [default: `now()`]
}

// Exercises Table
Table exercises {
  id UUID [pk, unique]
  name varchar [not null]
  muscle_group varchar
  equipment varchar
}

// Public Workouts Table
Table public_workouts {
  id UUID [pk, unique]
  name varchar
  exercises array [ref: > exercises.id]
  created_by UUID [ref: > users.id]
  created_at timestamp [default: `now()`]
}

// Mesocycles Table
Table mesocycles {
  id UUID [pk, unique]
  name varchar
  length integer
  workouts array [ref: > public_workouts.id]
  created_by UUID [ref: > users.id]
}

// Mesocycle Days Table
Table mesocycle_days {
  id UUID [pk, unique]
  mesocycle_id UUID [ref: > mesocycles.id]
  day_number integer
  workout_id UUID [ref: > public_workouts.id] // Nullable for rest days
  rest_day boolean
}

// User Workout History Table
Table user_workout_history {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id]
  workout_id UUID [ref: > public_workouts.id]
  date timestamp
}

// User Workout Sets Table
Table user_workout_sets {
  id UUID [pk, unique]
  user_workout_id UUID [ref: > user_workout_history.id]
  exercise_id UUID [ref: > exercises.id]
  set_number integer
  reps integer
  weight integer
}
```

## Users Table
| id          | username  | email                  | password_hash       | created_at          |
|-------------|-----------|------------------------|----------------------|---------------------|
| UUID_USER1  | johndoe   | johndoe@example.com    | hashed_password_1    | 2024-01-01 10:00:00 |
| UUID_USER2  | janedoe   | janedoe@example.com    | hashed_password_2    | 2024-01-01 10:00:00 |

## Exercises Table
| id          | name             | muscle_group | equipment |
|-------------|------------------|--------------|-----------|
| UUID_EX1    | Bench Press      | Chest        | Barbell   |
| UUID_EX2    | Squat            | Legs         | Barbell   |
| UUID_EX3    | Deadlift         | Legs         | Barbell   |
| UUID_EX4    | Pull-Up          | Back         | Bodyweight|
| UUID_EX5    | Overhead Press   | Shoulders    | Dumbbell  |

## Public Workouts Table
| id          | name      | exercises                  | created_by   | created_at          |
|-------------|-----------|----------------------------|---------------|---------------------|
| UUID_PW1    | Push Day  | {UUID_EX1, UUID_EX5}      | UUID_USER1    | 2024-01-02 10:00:00 |
| UUID_PW2    | Leg Day   | {UUID_EX2, UUID_EX3}      | UUID_USER1    | 2024-01-03 10:00:00 |
| UUID_PW3    | Pull Day  | {UUID_EX4}                 | UUID_USER1    | 2024-01-04 10:00:00 |

## Mesocycles Table
| id          | name               | length | workouts                     | created_by   |
|-------------|--------------------|--------|-------------------------------|---------------|
| UUID_MC1    | Strength Training   | 4      | {UUID_PW1, UUID_PW2, UUID_PW3} | UUID_USER1    |

## Mesocycle Days Table
| id          | mesocycle_id | day_number | workout_id | rest_day |
|-------------|--------------|------------|------------|----------|
| UUID_MD1    | UUID_MC1     | 1          | UUID_PW1   | false    |
| UUID_MD2    | UUID_MC1     | 2          | UUID_PW2   | false    |
| UUID_MD3    | UUID_MC1     | 3          | UUID_PW3   | false    |
| UUID_MD4    | UUID_MC1     | 4          | NULL       | true     |
| UUID_MD5    | UUID_MC1     | 5          | UUID_PW1   | false    |
| UUID_MD6    | UUID_MC1     | 6          | UUID_PW2   | false    |
| UUID_MD7    | UUID_MC1     | 7          | UUID_PW3   | false    |

## User Workout History Table
| id          | user_id     | workout_id | date                 |
|-------------|-------------|------------|----------------------|
| UUID_UWH1   | UUID_USER1  | UUID_PW1   | 2024-01-01 10:00:00  |
| UUID_UWH2   | UUID_USER1  | UUID_PW2   | 2024-01-03 10:00:00  |

## User Workout Sets Table
| id          | user_workout_id | exercise_id | set_number | reps | weight |
|-------------|------------------|--------------|------------|------|--------|
| UUID_UWS1   | UUID_UWH1        | UUID_EX1     | 1          | 8    | 50     |
| UUID_UWS2   | UUID_UWH1        | UUID_EX1     | 2          | 6    | 55     |
| UUID_UWS3   | UUID_UWH1        | UUID_EX5     | 1          | 10   | 30     |
| UUID_UWS4   | UUID_UWH2        | UUID_EX2     | 1          | 8    | 60     |
| UUID_UWS5   | UUID_UWH2        | UUID_EX3     | 1          | 6    | 70     |

---

# User Journey

### Step 1: User Creates Exercises
- **User Action**: A user creates exercises that can be added to workouts.
- **Example Exercises**: 
  - Bench Press
  - Squat
  - Deadlift
  - Pull-Up
  - Overhead Press

---

### Step 2: User Creates Public Workouts
- **User Action**: The user creates public workouts using the exercises they have added.
- **Example Workouts**: 
  - Push Day (Bench Press, Overhead Press)
  - Leg Day (Squat, Deadlift)
  - Pull Day (Pull-Up)

---

### Step 3: User Creates a Mesocycle
- **User Action**: The user creates a mesocycle and selects workouts to include.
- **Example Mesocycle**: 
  - **Name**: Strength Training
  - **Length**: 4 weeks
  - **Selected Workouts**: Push Day, Leg Day, Pull Day

---

### Step 4: Define the Mesocycle Days
- **User Action**: The system automatically generates mesocycle days based on the selected workouts, repeating them for the defined length.
- **Example Schedule**: 
  - Push Day
  - Leg Day
  - Pull Day 
  - (repeated for 4 weeks)

---

### Step 5: User Completes Workouts and Logs Performance
- **User Action**: The user completes workouts and logs their performance metrics.
- **Example Logging for Push Day**:
  - **Workout Date**: 2024-01-01
  - **Sets for Bench Press**:
    - Set 1: 8 reps at 50 kg
    - Set 2: 6 reps at 55 kg
  - **Sets for Overhead Press**:
    - Set 1: 10 reps at 30 kg
  
  This would be captured in the **User Workout History Table** and **User Workout Sets Table**.

---

### Step 6: Track Historical Data
- **User Action**: The user can view historical data to monitor progress over time.

```sql

SELECT 
    uwh.date AS workout_date,
    uws.set_number,
    uws.reps,
    uws.weight,
    pw.name AS workout_name
FROM 
    users u
JOIN 
    user_workout_history uwh ON u.id = uwh.user_id
JOIN 
    user_workout_sets uws ON uwh.id = uws.user_workout_id
JOIN 
    exercises e ON uws.exercise_id = e.id
JOIN 
    public_workouts pw ON uwh.workout_id = pw.id
WHERE 
    u.username = 'johndoe' AND e.name = 'Bench Press';

```
