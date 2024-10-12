## Database Structure

### Tables

- **Users Table**
  - Stores user details.

- **Exercises Table**
  - Contains a list of available exercises.

- **Public Workouts Table**
  - Allows users to create and share public workouts.

- **Mesocycles Table**
  - Links users to selected workouts for a specified length.

- **Mesocycle Days Table**
  - Defines daily workout schedules within mesocycles, including rest days.

- **User Exercises Table**
  - Tracks individual user performance metrics for exercises linked to workouts.

- **User Exercise History Table**
  - Records historical performance data for user exercises over time.

### Database Model

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

// User Exercises Table
Table user_exercises {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id]
  workout_id UUID [ref: > public_workouts.id]
  exercise_id UUID [ref: > exercises.id]
  sets integer
  reps integer
  weight integer
}

// User Exercise History Table
Table user_exercise_history {
  id UUID [pk, unique]
  user_exercise_id UUID [ref: > user_exercises.id]
  date timestamp
  sets integer
  reps integer
  weight integer
}
```

# User Journey

## Step 1: User Creates Exercises

**User Action**: A user creates exercises that can be added to workouts.

**Example Data**:
- Bench Press (Chest)
- Squat (Legs)
- Deadlift (Legs)
- Pull-Up (Back)
- Overhead Press (Shoulders)

---

## Step 2: User Creates Public Workouts

**User Action**: The user creates public workouts using the exercises they have added.

**Example Workouts**:
- **Push Day**: (Bench Press, Overhead Press)
- **Leg Day**: (Squat, Deadlift)
- **Pull Day**: (Pull-Up)

---

## Step 3: User Creates a Mesocycle

**User Action**: The user creates a mesocycle and selects workouts to include.

**Example Mesocycle**:
- **Name**: Strength Training
- **Length**: 4 weeks
- **Selected Workouts**: Push Day, Leg Day, Pull Day

---

## Step 4: Define the Mesocycle Days

**User Action**: The system automatically generates mesocycle days based on the selected workouts, repeating them for the defined length.

**Example Schedule**:
- **Week 1**: Push Day, Leg Day, Pull Day
- **Week 2**: Push Day, Leg Day, Pull Day
- **Week 3**: Push Day, Leg Day, Pull Day
- **Week 4**: Push Day, Leg Day, Pull Day

---

## Step 5: User Completes Workouts and Logs Performance

**User Action**: The user completes workouts and logs their performance metrics.

**Example Performance Logging for Push Day**:
- **Workout Date**: 2024-01-01
- **Exercise**: Bench Press
  - Sets: 3
  - Reps: 8
  - Weight: 50 kg
- **Exercise**: Overhead Press
  - Sets: 3
  - Reps: 10
  - Weight: 30 kg

---

## Step 6: Track Historical Data

**User Action**: The user can view historical data to monitor progress over time.

**Example Historical Data for the Bench Press**:

| id          | user_exercise_id | date                | sets | reps | weight |
|-------------|-------------------|---------------------|------|------|--------|
| UUID_HE1    | UUID_UE1          | 2024-01-01 10:00:00 | 3    | 8    | 50     |
| UUID_HE2    | UUID_UE1          | 2024-01-05 10:00:00 | 3    | 10   | 55     |
| UUID_HE3    | UUID_UE1          | 2024-01-10 10:00:00 | 3    | 12   | 60     |

---

