def calculateMetabolicRate(weight, height, age, sex):
    if sex == "male":
        bmr = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age)
    else:
        bmr = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age)
    return bmr

def calculateMaintenanceCalories(bmr, activity_level):
    if activity_level == "none":
        calories = bmr * 1.2
    elif activity_level == "lightly active":
        calories = bmr * 1.375
    elif activity_level == "moderately active":
        calories = bmr * 1.55
    elif activity_level == "very active":
        calories = bmr * 1.725
    elif activity_level == "extra active":
        calories = bmr * 1.9
    else:
        calories = bmr * 1.725
    return calories

def calculateWeightLossCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) - 500

def calculateWeightGainCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) + 500

def simpleWorkoutPlan(weight, height, age, sex):
    # Calculate BMI (Body Mass Index)
    bmi = weight / ((height/100) ** 2)
    
    # Determine workout intensity based on BMI and age
    if bmi < 18.5:
        intensity = "low"
    elif bmi >= 18.5 and bmi < 25:
        intensity = "medium"
    else:
        intensity = "high"
    
    # Determine workout duration based on age
    if age < 30:
        duration = "30 minutes"
    elif age >= 30 and age < 50:
        duration = "45 minutes"
    else:
        duration = "60 minutes"
    
    # Define workout exercises based on sex
    if sex.lower() == "male":
        exercises = ["Push-ups", "Pull-ups", "Squats", "Deadlifts", "Planks"]
    elif sex.lower() == "female":
        exercises = ["Push-ups", "Squats", "Lunges", "Bent-over rows", "Leg raises"]
    else:
        exercises = ["Push-ups", "Squats", "Planks"]
    
    # Print the generated workout plan
    print("\nYour Workout Plan:")
    print(f"- Workout Intensity: {intensity}")
    print(f"- Workout Duration: {duration}")
    print("- Exercises:")
    for exercise in exercises:
        print(f"  - {exercise}")

def simpleWeightliftingPlan(weight, height, age, sex):
    # Calculate BMI (Body Mass Index)
    bmi = weight / ((height/100) ** 2)
    
    # Determine workout intensity based on BMI and age
    if bmi < 18.5:
        intensity = "low"
    elif bmi >= 18.5 and bmi < 25:
        intensity = "medium"
    else:
        intensity = "high"
    
    # Determine workout duration based on age
    if age < 30:
        duration = "30 minutes"
    elif age >= 30 and age < 50:
        duration = "45 minutes"
    else:
        duration = "60 minutes"
    
    # Define weightlifting exercises based on sex
    if sex.lower() == "male":
        exercises = ["Bench Press", "Deadlifts", "Squats", "Barbell Rows", "Overhead Press"]
    elif sex.lower() == "female":
        exercises = ["Barbell Squats", "Deadlifts", "Bench Press", "Barbell Rows", "Overhead Press"]
    else:
        exercises = ["Bench Press", "Deadlifts", "Squats"]
