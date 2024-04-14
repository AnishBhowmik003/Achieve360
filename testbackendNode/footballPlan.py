def generate_football_workout_plan(age, fitness_level, goals):
    """
    Generates a football workout plan based on user's age, fitness level, and goals.

    Parameters:
    - age (int): Age in years.
    - fitness_level (str): Fitness level ('beginner', 'intermediate', 'advanced').
    - goals (str): Goals for training ('endurance', 'strength', 'agility', 'skill development').

    Returns:
    - list: A list of workout activities (strings).
    """
    workout_plan = []

    # Determine workout based on age, fitness level, and goals
    if age < 18:
        workout_plan.append("Warm up: 10 minutes of light jogging and dynamic stretching")
        if fitness_level == "beginner":
            workout_plan.append("Skill development: Passing and dribbling drills for 20 minutes")
            workout_plan.append("Endurance training: 30 minutes of continuous running")
        elif fitness_level == "intermediate":
            workout_plan.append("Skill development: Shooting and ball control drills for 20 minutes")
            workout_plan.append("Strength training: Bodyweight exercises (push-ups, squats) for 20 minutes")
            workout_plan.append("Agility training: Cone drills and ladder exercises for 15 minutes")
        elif fitness_level == "advanced":
            workout_plan.append("Skill development: Advanced dribbling and juggling drills for 30 minutes")
            workout_plan.append("Strength training: Resistance band exercises and plyometrics for 30 minutes")
            workout_plan.append("Agility training: Speed ladder and shuttle runs for 20 minutes")
        else:
            return "Invalid fitness level. Please choose 'beginner', 'intermediate', or 'advanced'."

    else:
        workout_plan.append("Warm up: 15 minutes of light jogging and dynamic stretching")
        if goals == "endurance":
            workout_plan.append("Endurance training: Interval running (sprints and jogs) for 30 minutes")
        elif goals == "strength":
            workout_plan.append("Strength training: Weightlifting (squats, deadlifts) for 40 minutes")
        elif goals == "agility":
            workout_plan.append("Agility training: Cone drills, ladder exercises, and plyometrics for 30 minutes")
        elif goals == "skill development":
            workout_plan.append("Skill development: Technical drills (passing, shooting) for 40 minutes")
        else:
            return "Invalid goals. Please choose from 'endurance', 'strength', 'agility', or 'skill development'."

    workout_plan.append("Cool down: 10 minutes of static stretching and light jogging")

    return workout_plan

# Example usage:
age = 25  # Age in years
fitness_level = 'intermediate'  # Fitness level ('beginner', 'intermediate', 'advanced')
goals = 'strength'  # Goals for training ('endurance', 'strength', 'agility', 'skill development')

workout = generate_football_workout_plan(age, fitness_level, goals)
for activity in workout:
    print(activity)
