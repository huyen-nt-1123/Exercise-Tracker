// AI citation: I designed the functions and direction of this file; Claude Code (Anthropic) helped me write the code.
export const EXERCISES_SEED = [
  // Chest
  { id: 'ex-chest-01', name: 'Barbell Bench Press', muscleGroups: ['chest', 'triceps'], category: 'chest' },
  { id: 'ex-chest-02', name: 'Incline Dumbbell Press', muscleGroups: ['chest', 'shoulders'], category: 'chest' },
  { id: 'ex-chest-03', name: 'Cable Flye', muscleGroups: ['chest'], category: 'chest' },
  { id: 'ex-chest-04', name: 'Push-Up', muscleGroups: ['chest', 'triceps'], category: 'chest' },

  // Back
  { id: 'ex-back-01', name: 'Weighted Pull Ups', muscleGroups: ['back', 'biceps'], category: 'back' },
  { id: 'ex-back-02', name: 'Barbell Row', muscleGroups: ['back', 'biceps'], category: 'back' },
  { id: 'ex-back-03', name: 'Lat Pulldown', muscleGroups: ['back', 'biceps'], category: 'back' },
  { id: 'ex-back-04', name: 'Seated Cable Row', muscleGroups: ['back', 'forearms'], category: 'back' },
  { id: 'ex-back-05', name: 'Deadlift', muscleGroups: ['back', 'legs'], category: 'back' },

  // Shoulders
  { id: 'ex-shoulder-01', name: 'Overhead Press', muscleGroups: ['shoulders', 'triceps'], category: 'shoulders' },
  { id: 'ex-shoulder-02', name: 'Lateral Raise', muscleGroups: ['shoulders'], category: 'shoulders' },
  { id: 'ex-shoulder-03', name: 'Face Pull', muscleGroups: ['shoulders', 'back'], category: 'shoulders' },
  { id: 'ex-shoulder-04', name: 'Arnold Press', muscleGroups: ['shoulders'], category: 'shoulders' },

  // Legs
  { id: 'ex-legs-01', name: 'Goblet Squat', muscleGroups: ['legs', 'core'], category: 'legs' },
  { id: 'ex-legs-02', name: 'Barbell Squat', muscleGroups: ['legs', 'core'], category: 'legs' },
  { id: 'ex-legs-03', name: 'Romanian Deadlift', muscleGroups: ['legs', 'back'], category: 'legs' },
  { id: 'ex-legs-04', name: 'Leg Press', muscleGroups: ['legs'], category: 'legs' },
  { id: 'ex-legs-05', name: 'Walking Lunge', muscleGroups: ['legs', 'core'], category: 'legs' },

  // Arms
  { id: 'ex-arms-01', name: 'Barbell Curl', muscleGroups: ['biceps', 'forearms'], category: 'arms' },
  { id: 'ex-arms-02', name: 'Tricep Pushdown', muscleGroups: ['triceps'], category: 'arms' },
]
