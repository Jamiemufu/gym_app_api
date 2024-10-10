// User Table
Table users {
  id UUID [pk, unique]                               // Primary key
  email varchar(255) [not null, unique]             // User's email
  password_hash varchar(255) [not null]             // Hashed password
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// Group Table
Table groups {
  id UUID [pk, unique]                               // Primary key
  name varchar(255) [not null]                       // Group name
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// User-Group Table (For Managing Group Memberships)
Table user_groups {
  id UUID [pk, unique]                               // Primary key
  user_id UUID [ref: > users.id, not null]          // Foreign key to users table
  group_id UUID [ref: > groups.id, not null]        // Foreign key to groups table
  role varchar(50) [note: 'Role in the group, e.g., Member, Leader'] // User role
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// Mesocycle Table (Shared Properties Across Users)
Table mesocycles {
  id UUID [pk, unique]                               // Primary key
  name varchar(255) [not null]                       // Mesocycle name
  length int [note: 'Length of mesocycle in weeks or days'] // Duration
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// User-Mesocycle Table (User-Specific Attributes)
Table user_mesocycles {
  id UUID [pk, unique]                               // Primary key
  user_id UUID [ref: > users.id, not null]          // Foreign key to users table
  mesocycle_id UUID [ref: > mesocycles.id, not null] // Foreign key to mesocycles table
  phase varchar(50) [note: 'Training phase, e.g., Cut, Bulk, Maintenance'] // Phase of training
  intensity varchar(50) [note: 'Overall intensity level or RIR for this user'] // Intensity level
  group_id UUID [ref: > groups.id, not null]        // Foreign key to groups table
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// Workout Table (Associated with Mesocycles)
Table workouts {
  id UUID [pk, unique]                               // Primary key
  mesocycle_id UUID [ref: > mesocycles.id, not null] // Foreign key to mesocycles table
  name varchar(255) [not null]                       // Workout name
  group_id UUID [ref: > groups.id, not null]        // Foreign key to groups table
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// Exercise Table with Muscle Group for Filtering
Table exercises {
  id UUID [pk, unique]                               // Primary key
  workout_id UUID [ref: > workouts.id, not null]    // Foreign key to workouts table
  name varchar(255) [not null]                       // Exercise name
  muscle_group varchar(255) [note: 'Primary muscle group targeted, e.g., Chest, Legs, Back'] // Muscle group
  default_rest_interval int [note: 'Rest in seconds, can be overridden in targets'] // Default rest time
}

// Target Values Specific to Each User and Exercise in a Workout
Table user_exercise_targets {
  id UUID [pk, unique]                               // Primary key
  user_id UUID [ref: > users.id, not null]          // Foreign key to users table
  workout_id UUID [ref: > workouts.id, not null]    // Foreign key to workouts table
  exercise_id UUID [ref: > exercises.id, not null]  // Foreign key to exercises table
  target_sets int [not null]                         // Total sets targeted
  target_reps int [not null]                         // Total reps targeted
  target_weight decimal(5, 2) [not null]            // Target weight
  intensity varchar(50) [note: 'Target RIR or intensity level for this exercise'] // Target intensity
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// User Exercise Target Sets Table (Detailed Set-Level Targets)
Table user_exercise_target_sets {
  id UUID [pk, unique]                               // Primary key
  user_exercise_target_id UUID [ref: > user_exercise_targets.id, not null] // Foreign key to user_exercise_targets table
  set_number int [not null]                          // Set number (e.g., Set 1, Set 2, etc.)
  target_reps int [not null]                         // Target reps for this set
  target_weight decimal(5, 2) [not null]            // Target weight for this set
}

// User-Specific Logs Table for Actual Performance
Table user_exercise_logs {
  id UUID [pk, unique]                               // Primary key
  user_id UUID [ref: > users.id, not null]          // Foreign key to users table
  workout_id UUID [ref: > workouts.id, not null]    // Foreign key to workouts table
  exercise_id UUID [ref: > exercises.id, not null]  // Foreign key to exercises table
  sets int [note: 'Actual sets completed by user']   // Actual sets completed
  reps int [note: 'Actual reps completed by user']   // Actual reps completed
  weight decimal(5, 2) [note: 'Actual weight used by user'] // Actual weight used
  log_date timestamp [default: `now()`]             // Record date for the log
}

// Group Challenges Table
Table group_challenges {
  id UUID [pk, unique]                               // Primary key
  group_id UUID [ref: > groups.id, not null]        // Foreign key to groups table
  name varchar(255) [not null]                       // Challenge name
  start_date timestamp [not null]                    // Challenge start date
  end_date timestamp [not null]                      // Challenge end date
  created_at timestamp [default: `now()`]           // Record creation timestamp
}

// Group Progress Reports Table
Table group_progress_reports {
  id UUID [pk, unique]                               // Primary key
  group_id UUID [ref: > groups.id, not null]        // Foreign key to groups table
  report_date timestamp [default: `now()`]          // Date of report
  summary text [note: 'Summary of the group\'s progress'] // Progress summary
}

// Notifications Table for Group Activities
Table notifications {
  id UUID [pk, unique]                               // Primary key
  user_id UUID [ref: > users.id, not null]          // Foreign key to users table
  group_id UUID [ref: > groups.id, not null]        // Foreign key to groups table
  message text [not null]                            // Notification message
  created_at timestamp [default: `now()`]           // Record creation timestamp
}
