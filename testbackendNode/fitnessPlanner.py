def calculateMetabolicRate(weight, height, age, sex):
    if sex == "male":
        bmr = 66 + (6.3 * weight) + (12.9 * height) - (6.8 * age)
    else:
        bmr = 655 + (4.3 * weight) + (4.7 * height) - (4.7 * age)
    return bmr

def calculateMaintenanceCalories(bmr, activity_level):
    activity_levels = {
        "none": 1.2,
        "lightly active": 1.375,
        "moderately active": 1.55,
        "very active": 1.725,
        "extra active": 1.9
    }
    return bmr * activity_levels.get(activity_level.lower(), 1.725)

def calculateWeightLossCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) - 500

def calculateWeightGainCalories(bmr, activity_level):
    return calculateMaintenanceCalories(bmr, activity_level) + 500

def generateWorkoutPlan(weight, height, age, sex):
    bmi = weight / ((height/100) ** 2)
    
    intensity_levels = {
        "low": (18.5, "30 minutes"),
        "medium": (25, "45 minutes"),
        "high": (float('inf'), "60 minutes")
    }
    
    for level, (threshold, duration) in intensity_levels.items():
        if bmi < threshold:
            intensity = level
            break
    
    exercises = {
        "male": ["Push-ups", "Pull-ups", "Squats", "Deadlifts", "Planks"],
        "female": ["Push-ups", "Squats", "Lunges", "Bent-over rows", "Leg raises"],
        "other": ["Push-ups", "Squats", "Planks"]
    }
    
    workout_duration = "60 minutes" if age >= 50 else "45 minutes" if age >= 30 else "30 minutes"
    sex_key = sex.lower() if sex.lower() in ["male", "female"] else "other"
    selected_exercises = exercises.get(sex_key)
    
    return intensity, workout_duration, selected_exercises

def generateWeightliftingPlan(weight, height, age, sex):
    bmi = weight / ((height/100) ** 2)
    
    intensity_levels = {
        "low": (18.5, "30 minutes"),
        "medium": (25, "45 minutes"),
        "high": (float('inf'), "60 minutes")
    }
    
    for level, (threshold, duration) in intensity_levels.items():
        if bmi < threshold:
            intensity = level
            break
    
    exercises = {
        "male": ["Bench Press", "Deadlifts", "Squats", "Barbell Rows", "Overhead Press"],
        "female": ["Barbell Squats", "Deadlifts", "Bench Press", "Barbell Rows", "Overhead Press"],
        "other": ["Bench Press", "Deadlifts", "Squats"]
    }
    
    workout_duration = "60 minutes" if age >= 50 else "45 minutes" if age >= 30 else "30 minutes"
    sex_key = sex.lower() if sex.lower() in ["male", "female"] else "other"
    selected_exercises = exercises.get(sex_key)
    
    return intensity, workout_duration, selected_exercises

def generateDietPlan(goal, weight, height, age, sex):
    weight_gain_foods = {
        "Protein Sources": ["Chicken breast", "Salmon", "Tofu", "Greek yogurt"],
        "Carbohydrate Sources": ["Brown rice", "Sweet potatoes", "Quinoa", "Whole wheat bread"],
        "Healthy Fats": ["Avocado", "Nuts", "Olive oil", "Flaxseeds"],
        "Fruits": ["Bananas", "Berries", "Oranges", "Apples"],
        "Vegetables": ["Broccoli", "Spinach", "Bell peppers", "Carrots"]
    }

    weight_loss_foods = {
        "Lean Protein Sources": ["Turkey breast", "White fish", "Egg whites", "Cottage cheese"],
        "Non-Starchy Vegetables": ["Kale", "Cauliflower", "Zucchini", "Asparagus"],
        "Complex Carbohydrates": ["Quinoa", "Oats", "Barley", "Brown rice"],
        "Healthy Fats": ["Almonds", "Walnuts", "Chia seeds", "Coconut oil"],
        "Fruits": ["Grapefruit", "Watermelon", "Berries", "Pears"]
    }

    if goal.lower() == "gain":
        diet_plan = weight_gain_foods
    elif goal.lower() == "loss":
        diet_plan = weight_loss_foods
    elif goal.lower() == "maintain":
        diet_plan = weight_gain_foods
    else:
        return "Invalid goal. Please choose 'gain' or 'loss'."

    return diet_plan

def main():
    print("Welcome to the Fitness Planner!")
    print("Please provide your details.")
    weight = float(input("Weight (kg): "))
    height = float(input("Height (cm): "))
    age = int(input("Age: "))
    sex = input("Sex (male/female/other): ")
    activity_level = input("Activity Level (none/lightly active/moderately active/very active/extra active): ")

    bmr = calculateMetabolicRate(weight, height, age, sex)
    maintenance_calories = calculateMaintenanceCalories(bmr, activity_level)
    weight_loss_calories = calculateWeightLossCalories(bmr, activity_level)
    weight_gain_calories = calculateWeightGainCalories(bmr, activity_level)
    
    print("\nYour Fitness Information:")
    print(f"- Basal Metabolic Rate (BMR): {bmr:.2f} calories/day")
    print(f"- Maintenance Calories: {maintenance_calories:.2f} calories/day")
    print(f"- Calories for Weight Loss: {weight_loss_calories:.2f} calories/day")
    print(f"- Calories for Weight Gain: {weight_gain_calories:.2f} calories/day")
    
    workout_type = input("\nChoose workout type (workout/weightlifting): ")
    if workout_type.lower() == "workout":
        intensity, duration, exercises = generateWorkoutPlan(weight, height, age, sex)
    elif workout_type.lower() == "weightlifting":
        intensity, duration, exercises = generateWeightliftingPlan(weight, height, age, sex)
    else:
        print("Invalid workout type.")
        return
    
    print("\nYour Workout Plan:")
    print(f"- Workout Intensity: {intensity}")
    print(f"- Workout Duration: {duration}")
    print("- Exercises:")
    for exercise in exercises:
        print(f"  - {exercise}")

    goal = input("Do you want to gain or lose weight? ")
    diet_plan = generateDietPlan(goal, weight, height, age, sex)
    if isinstance(diet_plan, dict):
        print("\nYour Diet Plan:")
        for category, foods in diet_plan.items():
            print(f"\n{category}:")
            for food in foods:
                print(f"  - {food}")
    else:
        print(diet_plan)


def get_bmi_category(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 25:
        return "Normal Weight"
    elif 25 <= bmi < 30:
        return "Overweight"
    else:
        return "Obese"

def customize_exercises(exercise_options):
    print("Select exercises for your plan (comma-separated indices):")
    for i, exercise in enumerate(exercise_options, 1):
        print(f"{i}. {exercise}")
    selected_indices = input("Enter exercise indices: ").strip().split(',')
    selected_exercises = [exercise_options[int(idx) - 1] for idx in selected_indices if idx.isdigit()]
    return selected_exercises

def main():
    print("Welcome to the Fitness Planner!")
    print("Please provide your details.")
    
    weight = float(input("Weight (kg): "))
    height = float(input("Height (cm): "))
    age = int(input("Age: "))
    sex = input("Sex (male/female/other): ").lower()
    activity_level = input("Activity Level (none/lightly active/moderately active/very active/extra active): ").lower()
    
    # Calculate BMR and calorie goals
    bmr = calculateMetabolicRate(weight, height, age, sex)
    maintenance_calories = calculateMaintenanceCalories(bmr, activity_level)
    weight_loss_calories = calculateWeightLossCalories(bmr, activity_level)
    weight_gain_calories = calculateWeightGainCalories(bmr, activity_level)
    
    # Display fitness information
    print("\nYour Fitness Information:")
    print(f"- Basal Metabolic Rate (BMR): {bmr:.2f} calories/day")
    print(f"- Maintenance Calories: {maintenance_calories:.2f} calories/day")
    print(f"- Calories for Weight Loss: {weight_loss_calories:.2f} calories/day")
    print(f"- Calories for Weight Gain: {weight_gain_calories:.2f} calories/day")
    
    # Determine workout type and generate workout plan
    workout_type = input("\nChoose workout type (workout/weightlifting): ").lower()
    if workout_type == "workout":
        intensity, duration, exercise_options = generateWorkoutPlan(weight, height, age, sex)
    elif workout_type == "weightlifting":
        intensity, duration, exercise_options = generateWeightliftingPlan(weight, height, age, sex)
    else:
        print("Invalid workout type.")
        return
    
    # Customize workout plan
    print("\nYour Workout Plan:")
    print(f"- Workout Intensity: {intensity}")
    print(f"- Workout Duration: {duration}")
    customize_workout = input("Do you want to customize your exercises? (yes/no): ").lower()
    if customize_workout == "yes":
        exercises = customize_exercises(exercise_options)
    else:
        exercises = exercise_options
    
    for exercise in exercises:
        print(f"  - {exercise}")
    
    # Determine weight goal and generate diet plan
    goal = input("\nDo you want to gain or lose weight? ").lower()
    diet_plan = generateDietPlan(goal, weight, height, age, sex)
    if isinstance(diet_plan, dict):
        print("\nYour Diet Plan:")
        for category, foods in diet_plan.items():
            print(f"\n{category}:")
            for food in foods:
                print(f"  - {food}")
    else:
        print(diet_plan)

    # Display BMI category
    bmi = weight / ((height / 100) ** 2)
    bmi_category = get_bmi_category(bmi)
    print(f"\nYour BMI: {bmi:.2f} ({bmi_category})")

if __name__ == "__main__":
    main()
