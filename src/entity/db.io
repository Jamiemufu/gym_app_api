// User Table
Table users {
  id UUID [pk, unique]
  email varchar(255) [not null, unique]
  password_hash varchar(255) [not null]
  created_at timestamp [default: `now()`]
}

// Group Table
Table groups {
  id UUID [pk, unique]
  name varchar(255) [not null]
  created_at timestamp [default: `now()`]
}

// User-Group Table (For Managing Group Memberships)
Table user_groups {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id, not null]
  group_id UUID [ref: > groups.id, not null]
  role varchar(50) [note: 'Role in the group, e.g., Member, Leader']
  created_at timestamp [default: `now()`]
}

// Mesocycle Table (Shared Properties Across Users)
Table mesocycles {
  id UUID [pk, unique]
  name varchar(255) [not null]
  length int [note: 'Length of mesocycle in weeks or days']
  created_at timestamp [default: `now()`]
}

// User-Mesocycle Table (User-Specific Attributes)
Table user_mesocycles {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id, not null]
  mesocycle_id UUID [ref: > mesocycles.id, not null]
  phase varchar(50) [note: 'Training phase, e.g., Cut, Bulk, Maintenance']
  intensity varchar(50) [note: 'Overall intensity level or RIR for this user']
  group_id UUID [ref: > groups.id, not null] // Link to group
  created_at timestamp [default: `now()`]
}

// Workout Table (Associated with Mesocycles)
Table workouts {
  id UUID [pk, unique]
  mesocycle_id UUID [ref: > mesocycles.id, not null]
  name varchar(255) [not null]
  group_id UUID [ref: > groups.id, not null] // Link to group
  created_at timestamp [default: `now()`]
}

// Exercise Table with Muscle Group for Filtering
Table exercises {
  id UUID [pk, unique]
  workout_id UUID [ref: > workouts.id, not null]
  name varchar(255) [not null]
  muscle_group varchar(255) [note: 'Primary muscle group targeted, e.g., Chest, Legs, Back']
  default_rest_interval int [note: 'Rest in seconds, can be overridden in targets']
}

// Target Values Specific to Each User and Exercise in a Workout
Table user_exercise_targets {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id, not null]
  workout_id UUID [ref: > workouts.id, not null]
  exercise_id UUID [ref: > exercises.id, not null]
  target_sets int [not null]
  target_reps int [not null]
  target_weight decimal(5, 2) [not null]
  intensity varchar(50) [note: 'Target RIR or intensity level for this exercise']
  created_at timestamp [default: `now()`]
}

// User-Specific Logs Table for Actual Performance
Table user_exercise_logs {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id, not null]
  workout_id UUID [ref: > workouts.id, not null]
  exercise_id UUID [ref: > exercises.id, not null]
  sets int [note: 'Actual sets completed by user']
  reps int [note: 'Actual reps completed by user']
  weight decimal(5, 2) [note: 'Actual weight used by user']
  log_date timestamp [default: `now()`]
}

// Group Challenges Table
Table group_challenges {
  id UUID [pk, unique]
  group_id UUID [ref: > groups.id, not null]
  name varchar(255) [not null]
  start_date timestamp [not null]
  end_date timestamp [not null]
  created_at timestamp [default: `now()`]
}

// Group Progress Reports Table
Table group_progress_reports {
  id UUID [pk, unique]
  group_id UUID [ref: > groups.id, not null]
  report_date timestamp [default: `now()`]
  summary text [note: 'Summary of the group\'s progress']
}

// Notifications Table for Group Activities
Table notifications {
  id UUID [pk, unique]
  user_id UUID [ref: > users.id, not null]
  group_id UUID [ref: > groups.id, not null]
  message text [not null]
  created_at timestamp [default: `now()`]
}
